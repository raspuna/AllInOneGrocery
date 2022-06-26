const mongoose = require("mongoose");
const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: [true, "Store name is required"],
  },
  address: {
    type: String,
  },
  addressDetail: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
});

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;
