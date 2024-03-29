// model for items
// groceries have name, food class(vegetable, fruit, canned good, dry food, meat,) image? , price , quantity, description
const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Grocery name is required"],
      minlength: [3, "Product name must have at least 3 characters"],
      text: true,
    },
    itemClass: {
      type: String,
      enum: [
        "Vegetable",
        "Fruit",
        "Meat",
        "Canned Good",
        "Dry Food",
        "Miscellaneous",
      ],
      // required: [true, "Please select what type of product this is"],
    },
    itemQuantity: {
      type: Number,
      required: [true, "Please include the quanity for this product "],
    },
    itemDescription: {
      type: String,
      required: [true, "Please describe this product"],
      minlength: [
        5,
        "Please give a description longer than 3 characters long.",
      ],
    },
    itemPrice: {
      type: String,
      required: [true, "Please include a price"],
    },
    itemImage: {
      type: String,
      required: [true, "Please include a image"],
      data: Buffer,
    },
    groceryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter the grocery store ID"],
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
