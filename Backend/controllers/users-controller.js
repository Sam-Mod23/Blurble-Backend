const {
  fetchUsers,
  fetchUser,
  amendUserById
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
      console.log(status, msg, "getUser error");
      res.status(status).send(msg);
    });
};

exports.patchUserById = (req, res, next) => {
  const { _id } = req.params;
  const { blurblesInc, club_id, progress } = req.body;
  amendUserById(_id, req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
