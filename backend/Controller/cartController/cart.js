const mongoose = require('mongoose');
const Cart = require('../../Modules/cart');


function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

//POST API for adding and updating items in the cart
exports.AddToCart = (req, res) => {

  Cart.findOne({ user: req.user._id })
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Error in API",
          error: err
        })
      }
      if (cart) {
        let promiseArray = [];
        req.body.cartItems.forEach((cartItem) => {
          const product = cartItem.product;
          const item = cart.cartItems.find((c) => c.product == product);
          let condition, update;
          if (item) {
            condition = { user: req.user._id, "cartItems.product": product };
            update = {
              $set: {
                "cartItems.$": cartItem,
              },
            };
          } else {
            condition = { user: req.user._id };
            update = {
              $push: {
                cartItems: cartItem,
              },
            };
          }
          promiseArray.push(runUpdate(condition, update));

        });
        Promise.all(promiseArray)
          .then((response) => res.status(201).json({ response }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        //if cart not exist then create a new cart
        const cart = new Cart({
          user: req.user._id,
          cartItems: req.body.cartItems,
        });
        cart.save((error, cart) => {
          if (error) return res.status(400).json({ error });
          if (cart) {
            return res.status(201).json({ cart });
          }
        });
      }
    });
};



exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.user._id })
  .populate("cartItems.product", "_id ProductName Price ProductPicture")
  .exec((error, cart) => {
      console.log(cart);
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {}; 
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.ProductName,
            pic: {
              filename:item.product.ProductPicture.filename,
              path:item.product.ProductPicture.path
            },
            price: item.product.Price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
  //}
};


exports.removeCartItems = (req,res) =>{
  const {productId} = req.body.payload;
  if(productId){
    Cart.update(
      {user:req.user._id},
      {
        $pull: {
          cartItems: {
            product: productId
          }
        }
      }
    ).exec((error,result)=>{
      if (error) return res.status(400).json({ error });
      if (result){
        res.status(202).json({ result });
      }
    })
  }
};