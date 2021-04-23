const usersRouter = require("express").Router();
const {
  getUsers,
  getUser,
  patchUserByDetails,
  deleteUserByDetails,
  postUsers
} = require("../controllers/users-controller");

usersRouter.route("/").get(getUsers).post(postUsers);
usersRouter
  .route("/_id=:_id")
  .get(getUser)
  .patch(patchUserByDetails)
  .delete(deleteUserByDetails);
usersRouter
  .route("/username=:username")
  .get(getUser)
  .patch(patchUserByDetails)
  .delete(deleteUserByDetails);

module.exports = usersRouter;

// patch
