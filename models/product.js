const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please enter product title"] },
  price: { type: Number, required: [true, "Please enter product price"] },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  quantity: { type: Number, required: [true, "Please enter product quantity"] },
  imgSrc: { type: String, required: [true, "Please enter product image"] },
  downloadLink: {
    type: String,
    required: [true, "Please enter download Link"],
  },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
