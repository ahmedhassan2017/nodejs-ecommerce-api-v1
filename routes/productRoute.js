/* eslint-disable import/extensions */
const express = require("express");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/ProductValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(createProductValidator, createProduct);

// 1- rules for the route with the id
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

  
module.exports = router;
