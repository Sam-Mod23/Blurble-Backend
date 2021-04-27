const { Comment } = require("../database/db-connection");

exports.fetchComments = ({ _id, club_id, clubName }) => {
  let searchObject = {};
  if (club_id) searchObject = { club_id };
  if (clubName) searchObject = { clubName };
  if (_id) searchObject = { _id };
  return Comment.find(searchObject).then((comments) => {
    if (!comments.length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return comments.sort((a, b) => {
        return a.progress - b.progress;
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
