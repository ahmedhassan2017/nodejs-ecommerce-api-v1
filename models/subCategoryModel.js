const mongoose = require('mongoose');

const subCategorySchema =  new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'SubCategory required'],
            unique:[true,'SubCategory must be unique'],
            minlength:[2,'SubCategory must be at least 2 characters long'],
            maxlength:[32,'SubCategory must be at most 32 characters long'],


            
        },
        slug:{
            type:String,
            lowercase:true,
        },
        parent:{
            type:mongoose.Schema.ObjectId,
            ref:'Category',
            required:[true,'Parent category required'],
        },

    },{ timestamps:true }
);

const subCategoryModel = mongoose.model('SubCategory',subCategorySchema);

module.exports =subCategoryModel