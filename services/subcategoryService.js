const slugify = require("slugify");
const subCategoryModel = require("../models/subCategoryModel.js");

// to handle async errors
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ApiError = require("../utils/apiError");


// Middleware to set the category id to the body, so that it can be used in the createSubCategory function
exports.setCatogryIdToBody = (req, res, next) => {
    if (req.params.categoryId) req.body.parent = req.params.categoryId;
    next();
  };

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

// Middleware to create a filter for the subcategories based on the category id in the params
exports.createSubCategoryFilter = (req, res, next) => { 
let filter = {};
  // if there is a category id in the params, then filter the subcategories by the category id
  if (req.params.categoryId) filter = { parent: req.params.categoryId };
    req.filter = filter;
    next();
}


// @desc    Get all subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
     page = parseInt(req.query.page) || 1
  limit = parseInt(req.query.limit) || 3
  skip = (page - 1) * limit

  

    const subcategories = await subCategoryModel.find(req.filter).skip(skip).limit(limit)
    // .populate({path: 'parent',select:'name -_id '}); // populate means to show the parent category in the subcategory
    res.status(200).json({results : subcategories.length,page : page, data:subcategories});
  });


// @desc    Get a subcategory
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findById(id)
    // .populate({path: 'parent',select:'name -_id '});;

    if (!subCategory) {
        return next(new ApiError(`SubCategory not found with id of ${id}`, 404));
    }
    res.status(200).json({ data: subCategory });
});

// @desc    Update a subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, parent } = req.body;

    const subCategory = await subCategoryModel.findByIdAndUpdate(
    {_id: id, },
    {name,slug:slugify(name)},
    {parent},
    {new: true,runValidators: true }
    );

    if (!subCategory) {
        return next(new ApiError(`SubCategory not found with id of ${id}`, 404));
    }
    res.status(200).json({ data: subCategory });
});

// @desc   Delete a subcategory
// @route  DELETE /api/v1/subcategories/:id
// @access Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findByIdAndDelete(id);
    if (!subCategory) {
        return next(new ApiError(`SubCategory not found with id of ${id}`, 404));
    }
   res.status(200).json({ msg: `subCategory deleted` });
});
