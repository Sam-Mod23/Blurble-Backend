const commentsRouter = require("express").Router();
const {
  getComments,
  patchComment,
  postComment,
  deleteComment,
} = require("../controllers/comments-controller");

commentsRouter
  .route("/_id=:_id")
  .get(getComments)
  .patch(patchComment)
  .delete(deleteComment);
commentsRouter.route("/club_id=:club_id").get(getComments).post(postComment);
commentsRouter.route("/clubName=:clubName").get(getComments).post(postComment);

module.exports = commentsRouter;
