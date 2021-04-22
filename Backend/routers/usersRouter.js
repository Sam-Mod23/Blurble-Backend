const usersRouter = require("express").Router();
const {
  getUsers,
  getUser,
  patchUserById,
} = require("../controllers/users-controller");

usersRouter.route("/").get(getUsers);
usersRouter.route("/_id=:_id").get(getUser).patch(patchUserById);
usersRouter.route("/username=:username").get(getUser);

module.exports = usersRouter;

// patch
