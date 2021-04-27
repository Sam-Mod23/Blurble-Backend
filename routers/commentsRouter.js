const commentsRouter = require("express").Router();
const { getComments } = require("../controllers/comments-controller");

commentsRouter.route("/_id=:_id").get(getComments);
commentsRouter.route("/club_id=:club_id").get(getComments);
commentsRouter.route("/clubName=:clubName").get(getComments);

module.exports = commentsRouter;
