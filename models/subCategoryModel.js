const mongoose = require('mongoose');

const subCategorySchema = (
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
module.exports = mongoose.model('SubCategory',subCategorySchema);