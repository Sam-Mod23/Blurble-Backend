const { search } = require("../app");
const { Comment, mongoose, User } = require("../database/db-connection");
const { fetchClub } = require("./clubs-model");

exports.fetchComments = ({ _id, club_id, clubName }, { progress, orderBy }) => {
  let searchObject = {};

  if (club_id) searchObject = { club_id };
  if (clubName) searchObject = { clubName };
  if (_id) searchObject = { _id };
  if (progress) searchObject.progress = { $lte: progress };
  console.log(orderBy);
  return Comment.find(searchObject).then((comments) => {
    if (!comments.length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return comments.sort((a, b) => {
        let sortOrder = a.progress - b.progress;
        if (orderBy === "desc") sortOrder = b.progress - a.progress;
        return sortOrder;
      });
    }
  });
};

exports.amendComment = ({ _id }, { voteInc }) => {
  const searchObject = { _id };

  return Comment.findOneAndUpdate(
    searchObject,
    { $inc: { votes: voteInc } },
    {
      new: true,
    }
  ).then((doc) => {
    return doc;
  });
};

exports.addComment = ({ club_id, clubName }, newComment) => {
  let searchObject = {};
  if (club_id) searchObject = { _id: club_id };
  if (clubName) searchObject = { clubName };
  newComment._id = mongoose.Types.ObjectId();

  return fetchClub(searchObject)
    .then((res) => {
      if (!res.memberIds.includes(newComment.user_id)) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      } else {
        newComment.clubName = res.clubName;
        newComment.club_id = res._id;
        return newComment;
      }
    })
    .then((newComment) => {
      return Comment.create(newComment).then((comment) => {
        return comment;
      });
    });
};

exports.removeComment = ({ _id }) => {
  return Comment.deleteOne({ _id: _id }, (err) => {
    if (err) return err;
    return;
  });
};
