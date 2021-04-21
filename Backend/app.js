const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./routers/apiRouter');

app.use(express.json());

app.use('/api', apiRouter);

// app.all('/*', error404);

module.exports = app;
