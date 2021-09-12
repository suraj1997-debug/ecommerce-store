const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const cartModule = require('../../Modules/cart');



var razorpay = new Razorpay({
    key_id: 'rzp_test_lrjvuhWedXPNLe',
    key_secret: 'tXBTAa9W9HH15EVL7WfNDYYk'
  });

exports.Payment = async(req,res) =>{
    const {
        amount,user
    } = req.body;

   const options = {
        amount: amount,
        currency:'INR',
        receipt:shortid.generate(),
        payment_capture: 1
    }

    try{
    const response = await razorpay.orders.create(options)
    console.log(response);
    cartModule.findOne({user:mongoose.Types.ObjectId(user)})
    .then((data)=>{
        const id = mongoose.Types.ObjectId(data._id);
        cartModule.findByIdAndDelete({_id:id})
        .then(()=>{
            res.json({
                id:response.id,
                currency:response.currency,
                amount:response.amount
            })
        })
        .catch(err=>console.log(err))
       
    })
    .catch(error=>console.log(error))
    }
    catch (error){
        console.log(error);
    }
}