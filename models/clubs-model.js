const { Club, mongoose } = require("../database/db-connection");

exports.fetchClubs = () => {
  return Club.find({}, (err, clubs) => {
    if (err) return console.log(err);
    return clubs;
  });
};

exports.fetchClub = ({ _id, clubName }) => {
  let searchObject = {};
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };
  return Club.find(searchObject).then((club) => {
    if (!Object.keys(club).length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return club[0];
    }
  });
};

exports.addClub = (newClub) => {
  if (!newClub._id) newClub._id = mongoose.Types.ObjectId();
  return Club.create(newClub).then((postedClub) => {
    return postedClub;
  });
};

exports.removeClub = ({ _id, clubName }) => {
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };
  return Club.deleteOne(searchObject, (err) => {
    if (err) return Promise.reject(err);
    return;
  });
};

exports.amendClub = (
  { _id, clubName },
  { currentBook, selfLink, addMember, addAdmin }
) => {
  let searchObject;
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { username };
  let updateObj;

  if (currentBook) updateObj = { currentBook };
  if (selfLink) {
    updateObj = { $push: { nominatedBooks: { selfLink, votes: 0 } } };
  }
  if (addMember) {
    updateObj = { $push: { memberIds: addMember } };
  }
  if (addAdmin) {
    updateObj = { $push: { adminIds: addAdmin } };
  }
  return Club.findOneAndUpdate(searchObject, updateObj, { new: true }).then(
    (doc) => {
      return doc;
    }
  );
};

exports.amendNestedClubInfo = ({ _id, clubName }, { incVotes, selfLink }) => {
  let searchObject = {};
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };
  return this.fetchClub(searchObject).then((clubInfo) => {
    let updatedNominations;
    updatedNominations = clubInfo.nominatedBooks.map((book) => {
      if (selfLink === book.selfLink) {
        book.votes = book.votes + incVotes;
      }
      return book;
    });
    return Club.findOneAndUpdate(
      searchObject,
      { nominatedBooks: updatedNominations },
      { new: true }
    ).then((club) => {
      return club;
    });
  });
};

exports.amendClubMembersAndAdmins = (
  { _id, clubName },
  { removeMember, removeAdmin }
) => {
  let searchObject = {};
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };

  let arrayToUpdate;
  let remove;
  if (removeMember) {
    arrayToUpdate = "memberIds";
    remove = removeMember;
  } else if (removeAdmin) {
    arrayToUpdate = "adminIds";
    remove = removeAdmin;
  }

  return this.fetchClub(searchObject).then((clubInfo) => {
    const updatedMembers = clubInfo[arrayToUpdate].filter((member) => {
      return member !== remove;
    });
    return Club.findOneAndUpdate(
      searchObject,
      { [arrayToUpdate]: updatedMembers },
      { new: true }
    ).then((doc) => {
      return doc;
    });
  });
};

exports.archiveBook = ({}) => {};

// take (clubName, archive: true, newBook)
// invoke fetchClub with clubName
// .then((club) => amendClub(club.currentBook) to update archivedBooks
// invoke amendClub with newBook
// .then return club
