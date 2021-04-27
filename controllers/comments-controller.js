const {
  fetchComments,
  amendComment,
  addComment,
  removeComment,
} = require("../models/comments-model");

exports.getComments = (req, res, next) => {
  fetchComments(req.params)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  amendComment(req.params, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  addComment(req.params, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  removeComment(req.params)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};
