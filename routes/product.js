const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");
router.get("/", async (req, res) => {
  try {
    const productList = await ProductModel.find({});
    res.json(productList);
  } catch (error) {
    res.send(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.find({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    res.send("DataBase Error");
  }
});
router.post("/", async (req, res) => {
  const product = new ProductModel(req.body);
  try {
    const savedProduct = await product.save();
    console.log(savedProduct);
    res.json(savedProduct);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.send("DataBase Error");
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.json(deletedProduct);
  } catch (error) {
    res.send("DataBase Error");
  }
});

module.exports = router;
