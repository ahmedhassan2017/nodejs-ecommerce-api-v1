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