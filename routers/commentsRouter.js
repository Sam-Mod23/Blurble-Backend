const commentsRouter = require("express").Router();
const { getComments } = require("../controllers/comments-controller");

commentsRouter.route("/club_id=:club_id").get(getComments);
commentsRouter.route("/club_name=:club_name").get(getComments);

module.exports = commentsRouter;
