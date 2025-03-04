const {check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware.js');

exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id').bail(), // rules for validating the request 
  validatorMiddleware  // check if there are errors
];


exports.createCategoryValidator = [
  check('name').notEmpty().withMessage('Category name is required')
  .isLength({ min: 3 }).withMessage('Category name must be at least 3 characters')
  .isLength({ max: 32 }).withMessage('Category name must not be more than 32 characters')
  .isString().withMessage('Category name must be a string').bail(),
  validatorMiddleware
];

exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id').bail(),
  check('name').isString().withMessage('Category name must be a string').bail(),
  validatorMiddleware
];

exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id').bail(),
  validatorMiddleware
];

