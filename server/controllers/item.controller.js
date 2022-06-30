// controller for grocery items
const Item = require("../models/item.model");
module.exports = {
  createItem: (req, res) => {
    console.log("create", req.body);
    Item.create(req.body)
      .then((newItem) => {
        res.status(201).json(newItem);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in Create Item", error: err });
      });
  },
  getOneItem: (req, res) => {
    Item.findOne({ _id: req.params.id })
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in find by ID", error: err });
      });
  },
  getStoreItems: (req, res) => {
    Item.find({ groceryId: req.params.storeId })
      .then((items) => {
        res.json(items);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong in find all" });
      });
  },
  getItemsBySearch: (req, res) => {
    console.log("textSearch:", req.params.searchText);
    Item.find({
      $and: [
        { groceryId: req.params.storeId },
        {
          $text: {
            $search: req.params.searchText,
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        },
      ],
    })
      .limit(500)
      .then((items) => {
        console.log(items);
        res.json(items);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "something went wrong in find all" });
      });
  },
  getItemsByCategory: (req, res) => {
    Item.find({ itemClass: req.params.className })
      .then((items) => {
        res.json(items);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong in find all" });
      });
  },

  getAllItems: (req, res) => {
    Item.find({})
      .then((items) => {
        res.json(items);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong in find all" });
      });
  },
  updateItem: (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Something went wrong in update", error: err });
      });
  },
  deleteItem: (req, res) => {
    Item.findByIdAndDelete({ _id: req.params.id })
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "something went wrong in delete", error: err });
      });
  },
};
