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
  getAllStores: (req, res) => {
    Store.find({})
        .then((allStores) => res.json(allStores))
        .catch((err) => console.log(err));
},
      
  createStore: (req, res) =>{
    Store.create(req,body)
      .then((newStore) => res.json(newStore))
      .catch((err) => console.log(err));
  },
      
  getOneStore: (req, res) => {
    Store.findOne({ _id: req.params.id })
    .then((oneStore) => res.json(oneStore))
    .catch((err) => console.log(err));
    },

};


