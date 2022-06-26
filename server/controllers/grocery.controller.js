const Grocery = require("../models/grocery.model");

const createNewGrocery = (req, res) => {
  Grocery.create(req.body, {
    new: true,
    runValidators: true,
  })
    .then((newGrocery) => {
      res.json({ newGrocery });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllGrocery = (req, res) => {
  Grocery.find()
    .then((allGrocery) => {
      res.json(allGrocery);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getOneGrocery = (req, res) => {
  Grocery.findOne({ _id: req.params.id })
    .then((queriedOne) => {
      res.json({ queriedOne });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const updateGrocery = (req, res) => {
  Grocery.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const deleteGrocery = (req, res) => {
  Grocery.deleteOne({ _id: req.params.id })
    .then((deleteRequest) => {
      res.json({ deleteRequest });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  getAllGrocery,
  getOneGrocery,
  deleteGrocery,
  updateGrocery,
  createNewGrocery,
};
