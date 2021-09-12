const mongoose = require('mongoose');

var conn = mongoose.Collection;

var ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        default: ''
    },
    Price: {
        type: Number,
        default: ''
    },
    Rating: {
        type: Number,
        default: ''
    },
    ProductPicture:
    {
        filename: {
            type: String
        },
        path: {
            type: String
        }
    },
    DateOfManufactured: {
        type: Date,
        require: true
    },
    ExpiryDate: {
        type: Date,
        require: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true });

var ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;

