/* eslint-disable import/extensions */
const express = require("express");
const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");
const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(createBrandValidator, createBrand);

// 1- rules for the route with the id
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);


module.exports = router;
