const usersRouter = require('express').Router();
const {
  getUserById,
  patchUserById
} = require('../controllers/users-controller');

usersRouter.route('/:user_id').get(getUserById).patch(patchUserById);

module.exports = usersRouter;

// patch
