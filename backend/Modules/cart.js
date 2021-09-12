const mongoose = require('mongoose');

var conn = mongoose.Collection;

var cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    cartItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products',
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
},{timestamps:true});

var cartModel = mongoose.model('carts',cartSchema);

module.exports = cartModel;