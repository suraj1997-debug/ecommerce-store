const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config();

exports.checkAuth = (req,res,next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
    }
    else{
        return res.status(400).json({
            success:false,
            message:"You Don't have access rights"
        })
    }
    next();
}



exports.adminMiddleware = (req,res,next) =>{
    if( req.user.role !=='admin'){
        return res.status(400).json({
            success:false,
            message:"Admin access denied"
        })
    }
    next();
}




exports.userMiddleware = (req,res,next) =>{
    if(req.user.role !== 'user'){
        return res.status(400).json({
            success:false,
            message:"User access denied"
        })
    }
    next();
}