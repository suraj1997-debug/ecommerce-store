const mongoose = require('mongoose');
const express = require('express');
const { Payment } = require('../../Controller/orderController/order');
const { userMiddleware, checkAuth } = require('../../Middleware/auth');
const router = express.Router();

router.post('/razorpay',Payment);

module.exports = router;