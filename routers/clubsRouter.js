const clubsRouter = require("express").Router();
const {
  getClubs,
  getClub,
  postClub,
  deleteClub,
  patchClub
} = require("../controllers/clubs-controller");
const { error405 } = require("../errors");

clubsRouter.route("/").get(getClubs).post(postClub).all(error405);
clubsRouter
  .route("/_id=:_id")
  .get(getClub)
  .patch(patchClub)
  .delete(deleteClub)
  .all(error405);
clubsRouter
  .route("/clubName=:clubName")
  .get(getClub)
  .patch(patchClub)
  .delete(deleteClub)
  .all(error405);

module.exports = clubsRouter;
