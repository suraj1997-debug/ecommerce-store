const mongoose = require('mongoose');
const productModule = require('../../Modules/product');
const env = require('dotenv');

env.config();

//POST API to create products by Admin 
exports.createProduct = (req,res) =>{
    const id = mongoose.Types.ObjectId(req.user._id);
    const {
        ProductName,
        Price,
        Rating,
        DateOfManufactured,
        ExpiryDate
    } = req.body;

    let productPic = {};

    if(req.file){
        console.log(req.file);
         productPic = {
             filename:req.file.filename,
             path:req.file.path
            }
    }

    const productDetails = new productModule({
        ProductName,
        Price,
        Rating,
        DateOfManufactured,
        ExpiryDate,
        ProductPicture:productPic,
        userid:id
    })
    
    productDetails.save()
    .then(product=>{
       return  res.status(201).json({
           success:true,
           message:"Product Created",
           product:product
        })
    })
    .catch(err =>{
        return res.status(400).json({
            success:false,
            message:"Error in API",
            error:err
        })
    })

}

//POST API to fetch products
exports.getProducts = async(req,res) =>{

    const page = parseInt(req.body.page);
    if(page <=0){
        page = 1;
    }
    const limit = 10;
    const skip = (page - 1) * limit;
    const Pager = page;

     const alldetails = await productModule.aggregate().count('total');


    productModule
    .find()
    .skip(skip)
    .limit(limit)
    .exec()
    .then((products) => {
        const results ={};
        results.totalProductsdb = alldetails.length > 0 ? alldetails[0].total : 0;
        results.startOfItem = (Object.keys(products).length > 0 ) ? skip + 1 : 0;
        results.currentTotalItem = (Object.keys(products).length);
        results.endOfItem = (Object.keys(products).length >= 10 ) ? skip + 10 : results.currentTotalItem === 0 ? 0 :products.length + skip;
        results.Previous = ((results.startOfItem === 0) && (results.endOfItem === 0)) ? false : ( results.startOfItem > 10 )? true : false;
        results.Next =((results.startOfItem === 0) && (results.endOfItem === 0)) ? false : (results.endOfItem < results.totalProductsdb) ? true : false ;
        results.CurrentPage =  (results.currentTotalItem !== 0) ? Pager : null ;
        results.products = products;

            res.status(200).json({
                success: true,
                results:results
            })
       
    }).catch((err) => {
        return res.status(400).json({
            success: false,
            error: err
        })
    })
}

//POST API to fetch product by productid
exports.getProductDetail = (req,res) =>{
    const productid = mongoose.Types.ObjectId(req.params.id);

    const productName = req.params.productName;

    productModule.findOne({_id:productid,ProductName:productName })
    .exec()
    .then(product=>{
        res.status(200).json({
            success:true,
            message:"Done",
            product:product
        })
    })
    .catch(err=>{
        res.status(400).json({
            success:false,
            message:"Error in API",
            error:err
        })
    })
}