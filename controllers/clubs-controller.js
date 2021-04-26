const { fetchClub, fetchClubs } = require("../models/clubs-model");

exports.getClubs = (req, res, next) => {
  fetchClubs()
    .then((clubs) => {
      res.status(200).send({ clubs });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getClub = (req, res, next) => {
  fetchClub(req.params)
    .then((club) => {
      res.status(200).send({ club });
    })
    .catch((err) => {
      next(err);
    });
};
