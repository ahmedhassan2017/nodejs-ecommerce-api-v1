const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product required'],
        trim: true,
        minlength: [3, 'Product must be at least 3 characters long'],
        maxlength: [100, 'Product must be at most 32 characters long']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Description required'],
        minlength: [20, 'Description must be at least 3 characters long'],
        maxlength: [2000, 'Description must be at most 2000 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price required'],
        trim: true,
        min: [1, 'Price must be at least 1'],
        max: [100000, 'Price must be at most 100000']
    },
    priceAfterDiscount: {
        type: Number,
        default: 0
        
    },
    colors: {
        type: [String]

        },
    quantity: {
        type: Number,
        required: [true, 'Quantity required'],
        min: [1, 'Quantity must be at least 1'],
        max: [1000, 'Quantity must be at most 1000']
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
      
    },
    imageCover: {
        type: String,
        required: [true, 'Cover image required']
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category required']
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    ratingsAverage: {
        type: Number,
        default: 1,
        min: [1, 'Rating must be at least 0'],
        max: [5, 'Rating must be at most 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String]
    },
    reviews: {
        type: [String]
    },


}, { timestamps: true }
);


const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;