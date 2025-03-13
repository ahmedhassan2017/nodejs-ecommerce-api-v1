/* eslint-disable import/extensions */
const express = require("express");
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService.js");
const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);

// 1- rules for the route with the id
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

  // this is a sub route for the category route to get the subcategories of a category
  router.use('/:categoryId/subcategories', require('./subCategoryRoute'));

module.exports = router;
