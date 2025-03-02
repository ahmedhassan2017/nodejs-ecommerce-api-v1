const mongoose = require('mongoose');

// 7 create schema
const CategorySchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'Category required'],
        unique:[true, 'Category must be unique'],
        minlength: [3, 'Category must be at least 3 characters long'],
        maxlength: [32, 'Category must be at most 32 characters long']
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:{
        type:String,
    },
},
{
    timestamps:true
});
// 8 create model
const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;