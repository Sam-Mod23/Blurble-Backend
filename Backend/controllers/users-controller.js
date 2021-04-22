const {
  fetchUsers,
  fetchUser,
  amendUserById,
} = require("../models/users-model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  fetchUser(req.params)
    .then(([user]) => {
      res.status(200).send(user);
    })
    .catch(({ status, msg }) => {
      console.log(status, msg);
      res.status(status).send(msg);
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
