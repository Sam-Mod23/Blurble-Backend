const usersRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  patchUserById,
} = require("../controllers/users-controller");

usersRouter.route("/").get(getUsers);
usersRouter.route("/:user_id").get(getUserById).patch(patchUserById);

module.exports = usersRouter;

// patch
