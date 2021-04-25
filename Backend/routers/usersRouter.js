const usersRouter = require("express").Router();
const {
  getUsers,
  getUser,
  patchUserByDetails,
  deleteUserByDetails,
  postUsers
} = require("../controllers/users-controller");
const { error405 } = require("../errors");

usersRouter.route("/").get(getUsers).post(postUsers).all(error405);
usersRouter
  .route("/_id=:_id")
  .get(getUser)
  .patch(patchUserByDetails)
  .delete(deleteUserByDetails)
  .all(error405);
usersRouter
  .route("/username=:username")
  .get(getUser)
  .patch(patchUserByDetails)
  .delete(deleteUserByDetails)
  .all(error405);

module.exports = usersRouter;
