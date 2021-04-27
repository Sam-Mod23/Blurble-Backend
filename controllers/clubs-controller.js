const {
  fetchClub,
  fetchClubs,
  amendClub,
  addClub,
  removeClub,
  amendNestedClubInfo,
  amendClubMembersAndAdmins,
  archiveBook
} = require("../models/clubs-model");

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

exports.postClub = (req, res, next) => {
  addClub(req.body)
    .then((club) => {
      res.status(201).send({ club });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteClub = (req, res, next) => {
  const { _id, clubName } = req.params;
  removeClub(req.params)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchClub = (req, res, next) => {
  const { incVotes, selfLink, removeAdmin, removeMember } = req.body;
  if (removeAdmin || removeMember) {
    amendClubMembersAndAdmins(req.params, req.body)
      .then((club) => {
        res.status(201).send({ club });
      })
      .catch((err) => {
        next(err);
      });
  } else if (incVotes) {
    amendNestedClubInfo(req.params, req.body)
      .then((club) => {
        res.status(201).send({ club });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    amendClub(req.params, req.body)
      .then((club) => {
        res.status(201).send({ club });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.moveCurrentBookToArchive = (req, res, next) => {
  archiveBook();
};
