const { Comment } = require("../database/db-connection");
const commentsSchema = require("../database/schema/comments-schema");

exports.fetchComments = ({ club_id, clubname }) => {
  let searchObject = {};
  if (club_id) searchObject = { club_id };
  if (clubname) searchObject = { clubname };

  return Comment.find(searchObject).then((comments) => {
    if (!Object.keys(comments).length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return comments;
    }
  });
};
