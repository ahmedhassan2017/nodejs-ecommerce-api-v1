const mongoose = require('mongoose');

// 7 create schema
const brandSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique:[true, 'Brand must be unique'],
        minlength: [3, 'Brand must be at least 3 characters long'],
        maxlength: [32, 'Brand must be at most 32 characters long']
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:{
        type:String,
    },
}, { timestamps: true }
);
// 8 create model
module.exports = mongoose.model('Brand', brandSchema);

 