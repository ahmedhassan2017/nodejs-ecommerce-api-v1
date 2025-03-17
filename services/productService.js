
const slugify = require('slugify');
const ProductModel = require('../models/ProductModel.js');
// to handle async errors
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ApiError = require('../utils/apiError.js');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts =  asyncHandler(async (req, res) => {
  page = parseInt(req.query.page) || 1
  limit = parseInt(req.query.limit) || 3
  skip = (page - 1) * limit

    const products = await ProductModel.find().skip(skip).limit(limit);
    res.status(200).json({results : products.length,page :page, data:products});
  });

  // @desc    Get specific product
  // @route   GET /api/v1/products/:id
  // @access  Public
exports.getProduct = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

 // @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateproduct = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
 req.body.slug = slugify(req.body.name);

  const product = await ProductModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );

  if (!product) {
   return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteproduct = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
   return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ msg: `product deleted` });
});




// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private
exports.createproduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.name);
    const product = await ProductModel.create(req.body);
   res.status(201).json({data:product});

  });
  