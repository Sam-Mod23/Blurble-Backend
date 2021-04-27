const { Comment, mongoose } = require("../database/db-connection");
const { fetchClub } = require("./clubs-model");

exports.fetchComments = ({ _id, club_id, clubName }) => {
  let searchObject = {};
  if (club_id) searchObject = { club_id };
  if (clubName) searchObject = { clubName };
  if (_id) searchObject = { _id };
  return Comment.find(searchObject).then((comments) => {
    console.log(comments);
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

exports.addComment = ({ club_id, clubName }, newComment) => {
  let searchObject = {};
  newComment._id = mongoose.Types.ObjectId();
  if (club_id) searchObject = { club_id };
  if (clubName) searchObject = { clubName };
  console.log(club_id, clubName);
  return fetchClub(searchObject)
    .then((res) => {
      console.log(res);
      newComment.clubName = res.clubName;
      newComment.club_id = res._id;

      return newComment;
    })
    .then((newComment) => {
      const comment = Comment.create(newComment);
      return comment;
    });
};
