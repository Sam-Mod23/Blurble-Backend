const { fetchComments } = require("../models/comments-model");

exports.getComments = (req, res, next) => {
  console.log(req.params);
  fetchComments(req.params)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
