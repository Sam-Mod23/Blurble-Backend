const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routers/apiRouter");
const { errorMongo, error404 } = require("./errors");

app.use(express.json());

app.use("/api", apiRouter);

app.use(errorMongo);

app.all("/*", error404);

module.exports = app;
