const clubsRouter = require("express").Router();
const { getClubs, getClub } = require("../controllers/clubs-controller");
const { error405 } = require("../errors");

clubsRouter.route("/").get(getClubs).all(error405);
clubsRouter.route("/_id=:_id").get(getClub).all(error405);
clubsRouter.route("/clubName=:clubName").get(getClub).all(error405);

module.exports = clubsRouter;
