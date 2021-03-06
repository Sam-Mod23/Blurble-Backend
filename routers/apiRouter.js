const apiRouter = require("express").Router();
const { error405 } = require("../errors");
const { getAllEndpoints } = require("../controllers/api-controller");
const usersRouter = require("./usersRouter");

const commentsRouter = require("./commentsRouter");

const clubsRouter = require("./clubsRouter");


apiRouter.route("/").get(getAllEndpoints).all(error405);

apiRouter.use("/users", usersRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.use("/clubs", clubsRouter);


module.exports = apiRouter;

// req.body = {
//     blurbleInc: 50,
//     club_id: 'clubId',
//     progress: {club_id: 'clubId', progress: 20}
// }
