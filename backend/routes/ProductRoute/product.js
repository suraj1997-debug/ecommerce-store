const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const { createProduct, getProducts, getProductDetail } = require('../../Controller/ProductController/product');
const { checkAuth ,adminMiddleware, userMiddleware } = require('../../Middleware/auth');

var Storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename:function(req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname);
    }
})

var upload = multer({storage:Storage});


//POST API to create products by Admin 
router.post('/product/create',checkAuth,adminMiddleware,upload.single('productPic'),createProduct);

//POST API to fetch products 
router.post('/user/products',getProducts);

//POST API to fetch product by productid
router.get('/user/product/:productName/:id',getProductDetail);

module.exports = router;