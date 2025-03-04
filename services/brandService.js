
const slugify = require('slugify');
const brandModel = require('../models/brandModel.js');
// to handle async errors
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ApiError = require('../utils/apiError.js');

// @desc    Get all brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands =  asyncHandler(async (req, res) => {
  page = parseInt(req.query.page) || 1
  limit = parseInt(req.query.limit) || 3
  skip = (page - 1) * limit

    const brands = await brandModel.find().skip(skip).limit(limit);
    res.status(200).json({results : brands.length,page :page, data:brands});
  });

  // @desc    Get specific brand
  // @route   GET /api/v1/brands/:id
  // @access  Public
exports.getBrand = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

 // @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
   return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
   return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ msg: `brand deleted` });
});




// @desc    Create a brand
// @route   POST /api/v1/brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
   const name = req.body.name;
  
  const brand = await brandModel.create({name: name,slug: slugify(name)});
   res.status(201).json({data:brand});

  });
  