
const slugify = require('slugify');
const ProductModel = require('../models/productModel.js');
// to handle async errors
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const ApiError = require('../utils/apiError.js');
const { query } = require('express-validator');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts =  asyncHandler(async (req, res) => {
  // 1- filtering
const queryStringObj = {...req.query};
const excludesFields = ['page','limit','sort','fileds']
excludesFields.forEach((field=> delete queryStringObj[field]));

// 2- Pagination
  page = parseInt(req.query.page) || 1
  limit = parseInt(req.query.limit) || 3
  skip = (page - 1) * limit

  // Build query
  const monfooseQuery = ProductModel.find(queryStringObj)
  .skip(skip)
  .limit(limit)
  .populate({path:'category',select:'name'});

  // Execute query
    const products = await monfooseQuery;
    res.status(200).json({results : products.length,page :page, data:products});
  });

  // @desc    Get specific product
  // @route   GET /api/v1/products/:id
  // @access  Public
exports.getProduct = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  
  const product = await ProductModel.findById(id).populate(
    {
        path:'category',select:'name-_id'
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

 // @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
 
  if(req.body.title){ // if the title is updated
    req.body.slug = slugify(req.body.title);
  }
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
exports.deleteProduct = asyncHandler(async (req, res,next) => {
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
exports.createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    const product = await ProductModel.create(req.body);
   res.status(201).json({data:product});

  });
  