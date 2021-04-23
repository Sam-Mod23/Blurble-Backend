const usersRouter = require("express").Router();
const {
  getUsers,
  getUser,
  patchUserById,
  deleteUserById
} = require("../controllers/users-controller");

usersRouter.route("/").get(getUsers);
usersRouter
  .route("/_id=:_id")
  .get(getUser)
  .patch(patchUserById)
  .delete(deleteUserById);
usersRouter.route("/username=:username").get(getUser).patch(patchUserById);

module.exports = usersRouter;

// patch
