const {
  fetchUsers,
  fetchUser,
  amendUserByDetails,
  amendUserClubsByDetails,
  removeUserByDetails,
  addUser
} = require("../models/users-model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  fetchUser(req.params)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(({ status, msg }) => {
      console.log(status, msg);
      res.status(status).send({ msg });
    });
};

exports.patchUserByDetails = (req, res, next) => {
  const { _id, username } = req.params;
  const { club_id, progress, hasNominated, clubToRemove } = req.body;
  if (progress || hasNominated || clubToRemove) {
    amendUserClubsByDetails(req.params, req.body)
      .then((user) => {
        res.status(201).send({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    amendUserByDetails(req.params, req.body)
      .then((user) => {
        res.status(201).send({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.deleteUserByDetails = (req, res, next) => {
  const { _id, username } = req.params;
  removeUserByDetails(req.params)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUsers = (req, res, next) => {
  addUser(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(next);
};
