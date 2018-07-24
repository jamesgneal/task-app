const axios = require("axios");
const db = require("../database/models");

// Defining methods for the taskController
module.exports = {
  findTasks: function(req, res) {
    db.Tasks.find(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Tasks.create(req.body)
      .then(dbModel => {
        console.log(
          `\n====== response from the database of the dbModel\n\n${dbModel}`
        );
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Tasks.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Tasks.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
