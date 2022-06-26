const Order = require("../models/order.model");

const createNewOrder = (req, res) => {
  Order.create(req.body, {
    new: true,
    runValidators: true,
  })
    .then((newOrder) => {
      res.json({ newOrder });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong while creating an item",
        error: err,
      });
    });
};

const getAllOrder = (req, res) => {
  Order.find()
    .then((allOrder) => {
      res.json(allOrder);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong while getting the orders",
        error: err,
      });
    });
};

const getOneOrder = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .then((queriedOne) => {
      res.json({ queriedOne });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong while getting an item",
        error: err,
      });
    });
};

const updateOrder = (req, res) => {
  Order.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong while updating an item",
        error: err,
      });
    });
};

const deleteOrder = (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .then((deleteRequest) => {
      res.json({ deleteRequest });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong while deleting an item",
        error: err,
      });
    });
};

module.exports = {
  getAllOrder,
  getOneOrder,
  deleteOrder,
  updateOrder,
  createNewOrder,
};
