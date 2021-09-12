const mongoose = require('mongoose');
const express = require('express');
const { SignUp,UserLogin, AdminLogin, test, forgetPassword, resetPassword, changePassword } = require('../../Controller/userController/user');
const { userMiddleware, checkAuth } = require('../../Middleware/auth');
const router = express.Router();


//test api
router.get('/',test);

//POST API for SignUp functionality
router.post('/signup',SignUp);

//POST API for Login functionality
router.post('/admin/login',AdminLogin);

//POST API for Login functionality
router.post('/user/login',UserLogin);

//POST API for Change Password for the first time through dashboard
router.post('/user/changePassword',changePassword);

//POST API for forget password
router.post('/user/forget',forgetPassword);

//POST API for reset password
router.post('/user/reset/:resetToken',resetPassword);

// //POST API for logout 
// router.post('admin/signout',checkAuth,userMiddleware,logout)

module.exports = router;