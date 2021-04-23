const {
  fetchUsers,
  fetchUser,
  amendUserById,
  amendUserClubsById
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
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(({ status, msg }) => {
      console.log(status, msg, "getUser error");
      res.status(status).send(msg);
    });
};

exports.patchUserById = (req, res, next) => {
  const { _id, username } = req.params;
  const { blurblesInc, club_id, progress, hasNominated } = req.body;
  if (progress || hasNominated) {
    amendUserClubsById(req.params, req.body)
      .then((clubs) => {
        res.status(201).send(clubs);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    amendUserById(req.params, req.body)
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.deleteUserById = (req, res, next) => {
  const { _id } = req.params;
  removeUserById()
    .then((clubs) => {
      res.status(204);
    })
    .catch((err) => {
      console.log(err);
    });
};
