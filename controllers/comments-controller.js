const { fetchComments } = require("../models/comments-model");

exports.getComments = (req, res, next) => {
<<<<<<< HEAD
=======
  console.log(req.params);
>>>>>>> e5c109a7ff261a2102a90a455bfba074aecf18e6
  fetchComments(req.params)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
