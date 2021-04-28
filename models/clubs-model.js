const { search } = require("../app");
const { Club, mongoose, User } = require("../database/db-connection");
const { amendUserClubsByDetails } = require("./users-model");

exports.fetchClubs = () => {
  return Club.find({}, (err, clubs) => {
    if (err) return Promise.reject(err);
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
  { selfLink, addMember, addAdmin, bookToArchive, newBook }
) => {
  let searchObject;
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };
  let updateObj;

  if (newBook) updateObj = { currentBook: newBook };
  if (selfLink) {
    updateObj = {
      $push: { nominatedBooks: { selfLink, votes: 0, votedIds: [] } }
    };
  }
  if (addMember) {
    updateObj = { $push: { memberIds: addMember } };
  }
  if (addAdmin) {
    updateObj = { $push: { adminIds: addAdmin } };
  }
  if (bookToArchive) {
    updateObj = { $push: { archivedBooks: bookToArchive } };
  }
  return Club.findOneAndUpdate(searchObject, updateObj, { new: true }).then(
    (doc) => {
      return doc;
    }
  );
};

exports.amendNestedClubInfo = (
  { _id, clubName },
  { incVotes, selfLink, member_id }
) => {
  let searchObject = {};
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };
  return this.fetchClub(searchObject).then((clubInfo) => {
    let updatedNominations;
    updatedNominations = clubInfo.nominatedBooks.map((book) => {
      if (selfLink === book.selfLink) {
        const voted = book.votedIds.filter((votedId) => {
          return votedId === member_id;
        });
        if (voted.length === 0) {
          book.votedIds = [...book.votedIds, member_id];
          book.votes = book.votes + incVotes;
        }
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

exports.archiveBook = ({ _id, clubName }, { newBook }) => {
  return this.fetchClub({ _id, clubName }).then((club) => {
    let bookToArchive = club.currentBook;
    return this.amendClub({ _id, clubName }, { bookToArchive })
      .then(() => {
        return Promise.all(
          club.memberIds.map((userId) => {
            return amendUserClubsByDetails(
              { _id: userId },
              { club_id: _id, progress: 0, hasNominated: "no" }
            );
          })
        );
      })
      .then(() => {
        return this.amendClub({ _id, clubName }, { newBook });
      })
      .then(() => {
        return Club.findOneAndUpdate(
          _id ? { _id } : { clubName },
          { nominatedBooks: [] },
          { new: true }
        ).then((club) => {
          return club;
        });
      });
  });
};

exports.voteTally = ({ _id, clubName }, { completeVote }) => {
  if (_id) searchObject = { _id };
  if (clubName) searchObject = { clubName };

  return this.fetchClub(searchObject).then((club) => {
    const sortedNominations = club.nominatedBooks.sort((a, b) => {
      return b.votes - a.votes;
    });
    return this.archiveBook(searchObject, {
      newBook: sortedNominations[0].selfLink
    }).then((club) => {
      return { sortedNominations, club };
    });
  });
};
