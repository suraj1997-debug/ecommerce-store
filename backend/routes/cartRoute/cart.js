const mongoose = require('mongoose');
const express = require('express');
const { AddToCart, getCartItems, removeCartItems  } = require('../../Controller/cartController/cart');
const { checkAuth ,userMiddleware } = require('../../Middleware/auth');
const router = express.Router();

//POST API for adding and updating items in the cart
router.post('/user/cart/add-to-cart',checkAuth,userMiddleware,AddToCart);

//GET API for fetching Items from the cart
router.get('/user/cart/getCartItems',checkAuth,userMiddleware,getCartItems);

//POST API for deleting items from the cart
router.post('/user/cart/removeCartItems',checkAuth,userMiddleware,removeCartItems);

module.exports = router;