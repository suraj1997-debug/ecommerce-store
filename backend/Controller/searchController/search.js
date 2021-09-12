const mongoose = require('mongoose');

const ProductModule = require('../../Modules/product');


//POST API for searching products by Product Name
exports.searchProduct = async(req,res) =>{
    const {search} = req.query;

    const page = parseInt(req.query.page);
    if(page <=0){
        page = 1;
    }
    const limit = 10;
    const skip = (page - 1) * limit;
    const Pager = page;

     const alldetails = await ProductModule.aggregate().count('total');


    ProductModule.aggregate([
    {
        $match: { 
            ProductName: { $regex: search, $options: 'i' }
         }
    },
    {
        $skip:skip,
    },
    {
        $limit:limit
    }
    ])
    .then(data=>{
        const results ={};
        results.totalProductsdb = alldetails.length > 0 ? alldetails[0].total : 0;
        results.startOfItem = (Object.keys(data).length > 0 ) ? skip + 1 : 0;
        results.currentTotalItem = (Object.keys(data).length);
        results.endOfItem = (Object.keys(data).length >= 10 ) ? skip + 10 : results.currentTotalItem === 0 ? 0 :data.length + skip;
        results.Previous = ((results.startOfItem === 0) && (results.endOfItem === 0)) ? false : ( results.startOfItem > 10 )? true : false;
        results.Next =((results.startOfItem === 0) && (results.endOfItem === 0)) ? false : (results.endOfItem < results.totalProductsdb) ? true : false ;
        results.CurrentPage =  (results.currentTotalItem !== 0) ? Pager : null ;
        results.data = data;
        return res.status(200).json({
            success:true,
            message:"Data fetched Successfully!!",
            results:results
        })
    })
    .catch(err=>{
       return res.status(400).json({
            success:false,
            message:"Error in API",
            error:err
        })
    })
}