const { 
    createsubCategoryValidator,
    getsubsubCategoryValidator,
    updatesubCategoryValidator,
    deletesubCategoryValidator
 } = require("../utils/validators/subCategoryValidator.js");

 const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCatogryIdToBody,
    createSubCategoryFilter
} = require("../services/subcategoryService");
const express = require("express");

// mergeParams: true is necessary for the route to receive the params from the parent router
const router = express.Router( { mergeParams: true }); 
router.route("/")
.post(setCatogryIdToBody,createsubCategoryValidator,createSubCategory)
.get(createSubCategoryFilter,getSubCategories);

router.route("/:id")
.get(getsubsubCategoryValidator,getSubCategory)
.put(updatesubCategoryValidator,updateSubCategory)
.delete(deletesubCategoryValidator,deleteSubCategory);

module.exports = router;