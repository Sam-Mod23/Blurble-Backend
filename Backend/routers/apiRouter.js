const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
// const clubsRouter = require('./clubsRouter');

apiRouter.use('/users', usersRouter);
// apiRouter.use('/clubs', clubsRouter);
// apiRouter.use('/books', booksRouter);

module.exports = apiRouter;
