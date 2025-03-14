
const slugify = require('slugify');
const CategoryModel = require('../models/CategoryModel.js');
// to handle async errors
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ApiError = require('../utils/apiError.js');

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories =  asyncHandler(async (req, res) => {
  page = parseInt(req.query.page) || 1
  limit = parseInt(req.query.limit) || 3
  skip = (page - 1) * limit

    const categories = await CategoryModel.find().skip(skip).limit(limit);
    res.status(200).json({results : categories.length,page :page, data:categories});
  });

  // @desc    Get specific category
  // @route   GET /api/v1/categories/:id
  // @access  Public
exports.getCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

 // @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
   return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
   return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ msg: `Category deleted` });
});




// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
   const name = req.body.name;
  
  const category = await CategoryModel.create({name: name,slug: slugify(name)});
   res.status(201).json({data:category});

  });
  