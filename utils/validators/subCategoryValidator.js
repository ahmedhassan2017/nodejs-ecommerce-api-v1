const {check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware.js');

exports.getsubsubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id').bail(), // rules for validating the request 
  validatorMiddleware  // check if there are errors
];



exports.createsubCategoryValidator = [
  check('name').notEmpty().withMessage('subCategory name is required')
  .isLength({ min: 2 }).withMessage('subCategory name must be at least 3 characters')
  .isLength({ max: 32 }).withMessage('subCategory name must not be more than 32 characters')
  .isString().withMessage('subCategory name must be a string'),
  check('parent').notEmpty().withMessage('subCategory parent is required')
  .isMongoId().withMessage('Invalid parent id').bail(),
  validatorMiddleware
];

exports.updatesubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id').bail(),
  check('name').isString().withMessage('subCategory name must be a string').bail(),
  check('parent').isMongoId().withMessage('Invalid parent id').bail(),
  validatorMiddleware
];

exports.deletesubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid subCategory id').bail(),
  validatorMiddleware
];

