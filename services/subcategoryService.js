const slugify = require("slugify");
const subCategoryModel = require("../models/subCategoryModel.js");

// to handle async errors
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ApiError = require("../utils/apiError");

// @desc    Create a subcategory
// @route   POST /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
    const { name, parent } = req.body;
    
    const subCategory = await subCategoryModel.create({
        name,
        slug: slugify(name), 
        parent,
       
    });
    
    res.status(201).json({  success: true, data: subCategory});
    });

// @desc    Get all subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
     page = parseInt(req.query.page) || 1
  limit = parseInt(req.query.limit) || 3
  skip = (page - 1) * limit

    const subcategories = await subCategoryModel.find().skip(skip).limit(limit);
    res.status(200).json({results : subcategories.length,page : page, data:subcategories});
  });


// @desc    Get a subcategory
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findById(id);

    if (!subCategory) {
        return next(new ApiError(`SubCategory not found with id of ${id}`, 404));
    }
    res.status(200).json({ data: subCategory });
});

