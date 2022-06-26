const Store = require("../models/store.model");
const createStore = async (req, res) => {
  try {
    newStore = await Store.create(req.body);
    res.status(200).json(newStore);
  } catch (err) {
    console.log("store create err:", err);
    res.status(500).json({ err });
  }
};
module.exports = {
  createStore,
};
