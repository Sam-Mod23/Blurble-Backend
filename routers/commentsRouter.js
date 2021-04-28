const commentsRouter = require("express").Router();
const {
  getComments,
  patchComment,
  postComment,
  deleteComment,
} = require("../controllers/comments-controller");
const { error405 } = require("../errors");

commentsRouter
  .route("/_id=:_id")
  .get(getComments)
  .patch(patchComment)
  .delete(deleteComment)
  .all(error405);
commentsRouter
  .route("/club_id=:club_id")
  .get(getComments)
  .post(postComment)
  .all(error405);
commentsRouter
  .route("/clubName=:clubName")
  .get(getComments)
  .post(postComment)
  .all(error405);

module.exports = commentsRouter;
