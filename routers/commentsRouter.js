const commentsRouter = require("express").Router();
const { getComments } = require("../controllers/comments-controller");

commentsRouter.route("/club_id=:club_id").get(getComments);
