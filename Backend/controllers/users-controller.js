const { fetchUserById, amendUserById } = require('../models/users-model');

exports.getUserById = (req, res, next) => {
  const { user_id } = req.params;

  fetchUserById(user_id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.patchUserById = (req, res, next) => {
  const { user_id } = req.params;
  const { blurbleInc, club_id, progress } = req.body;

  amendUserById(user_id, blurbleInc)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
