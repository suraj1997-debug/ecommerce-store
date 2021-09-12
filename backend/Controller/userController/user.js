const mongoose = require('mongoose');
const userModel = require('../../Modules/user');
const nodemailer = require('nodemailer');
const shortid = require('shortid');
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


//POST API for testApi
exports.test = (req,res) =>{
    res.status(200).json({
        user:'hello'
    })
}

//POST API for SignUpUser
exports.SignUp = (req,res) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        role
    } = req.body;

   userModel.findOne({email:email},(err,data)=>{
    //    if(err){
    //        return res.status(400).json({
    //            success:false,
    //            message:'Error in API',
    //            error:err
    //        })
    //    }
       if(data){
        return res.status(400).json({
            success:false,
            message:'User Already Registered',
            error:err,
            msg:console.log(data)
        })
       }
       else{
           userDetails = new userModel({
            firstName,
            lastName,
            email,
            username:`${firstName}${shortid.generate()}`,
            phone,
            address,
            role
           })

           userDetails.save()
           .then(user=>{
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            });

            let mailOptions = {
                from: 'sbhangu110@gmail.com',
                to: `${user.email}`,
                subject: 'Email and Password For Authentication',
                html: `
                        <h2>email: ${user.email}</h2>
                        <h2>password: ${user.username} </h2> // you need to change your password afterwards for secured authentication                                
                       `
            }
            transporter.sendMail(mailOptions, (err, mail) => {
                if (err || !mail) {
                    return res.status(400).json({
                        success: false,
                        messege: 'Error in API',
                        error: err
                    })

                }
                if (mail) {
                    res.status(201).json({
                        success:true,
                        message:'Email has been sent.Kindly check your email and password',
                        user:user
                    })
                }
           })
        })
           .catch(error=>{
               return res.status(400).json({
                   success:false,
                   message:'Error in API',
                   error:error
               })
           })
       }

    
   })
} 

//POST API for LoginAdmin
exports.AdminLogin = (req,res) =>{
    const {email,password} = req.body;

    userModel.findOne({email:email})
    .exec((err,user)=>{
        if(err || !user ){
            return res.status(400).json({
                success:false,
                message:'error in API',
                error:err
            })
        }

        if(user){
            if(!user.password){
                if(password === user.username && user.role === 'admin') {
                    const token = jwt.sign(
                        {
                          _id:user._id,
                          role:user.role
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn:'1d'
                        }
                    );
                    res.status(200).json({
                        success:true,
                        message:'Admin LoggedIn Successfully',
                        token:token,
                        user:user
                      })
               
              }
              else{
                  return res.status(400).json({
                    success:false,
                    message:'Incorrect Password',
                    error:err
                  })
              }
            }else{
                var bytes  = CryptoJS.AES.decrypt(user.password, 'secret key 123');
                var loginPassword = bytes.toString(CryptoJS.enc.Utf8);
                if(password === loginPassword  && user.role === 'admin') {
                    const token = jwt.sign(
                        {
                          _id:user._id,
                          role:user.role
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn:'1d'
                        }
                    );
                    res.status(200).json({
                        success:true,
                        message:'Admin LoggedIn Successfully',
                        token:token,
                        user:user
                      })
               
              }
              else{
                  return res.status(400).json({
                    success:false,
                    message:'Incorrect Password',
                    error:err
                  })
              }
            }
             
        }
    })

}

//POST API for LoginUser
exports.UserLogin = (req,res) =>{
    const {email,password} = req.body;

    userModel.findOne({email:email})
    .exec((err,user)=>{
        // console.log('user',user);
        if(err || !user ){
            return res.status(400).json({
                success:false,
                message:'error in API',
                error:err
            })
        }

        if(user){
            console.log('user',user)
            if(!user.password){
                if(password === user.username && user.role === 'user') {
                    const token = jwt.sign(
                        {
                          _id:user._id,
                          role:user.role
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn:'1d'
                        }
                    );
                    res.status(200).json({
                        success:true,
                        message:'User LoggedIn Successfully',
                        token:token,
                        user:user
                      })
               
              }
              else{
                  return res.status(400).json({
                    success:false,
                    message:'Incorrect Password',
                    error:err
                  })
              }
            }else{
                var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
                var loginPassword = bytes.toString(CryptoJS.enc.Utf8);
               
                if(password === loginPassword  && user.role === 'user') {
                    const token = jwt.sign(
                        {
                          _id:user._id,
                          role:user.role
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn:'1d'
                        }
                    );
                    res.status(200).json({
                        success:true,
                        message:'User LoggedIn Successfully',
                        token:token,
                        user:user
                      })
               
              }
              else{
                  return res.status(400).json({
                    success:false,
                    message:'Incorrect Password',
                    error:err
                  })
              }
            }
             
        }
    })

}

//POST API for change password
exports.changePassword = (req,res) =>{
    const {
        email,
        oldpassword,
        newpassword
    } = req.body;

    userModel.findOne({email:email})
    .exec()
    .then(user=>{
        if(user.password){
            if(user.password === oldpassword){
                var ChangedPassword = CryptoJS.AES.encrypt(newpassword, process.env.SECRET_KEY).toString();
                user.password = ChangedPassword ? ChangedPassword : '';
                user.save()
                .then(data=>{
                    res.status(202).json({
                        success:true,
                        message:"Password Changed Successfully"
                    })
                })
                .catch(error=>{
                    res.status(400).json({
                        success:false,
                        message:'Error in API',
                        error:error
                    })
                })
            }
        }
        else{
            if(user.username === oldpassword){
                var ChangedPassword = CryptoJS.AES.encrypt(newpassword, process.env.SECRET_KEY).toString();
                user.password = ChangedPassword ? ChangedPassword : '';
                user.save()
                .then(data=>{
                    res.status(202).json({
                        success:true,
                        message:"Password Changed Successfully",
                    })
                })
                .catch(error=>{
                    res.status(400).json({
                        success:false,
                        message:'Error in API',
                        error:error
                    })
                })
        }
        }
       
    })
    .catch(err=>{
        res.status(400).json({
            success:false,
            message:'Error in API',
            error:err,
            msg:console.log(err)
        })
    })
}

//POST API for forget password
exports.forgetPassword = (req,res) =>{
    const {email} = req.body;
    userModel.findOne({email:email})
    .exec((err,user)=>{
        // console.log('user',user)
        if(err || !user) {
            return res.status(400).json({
                success:false,
                message:'Error in API',
                error:err
            })
        }
        if(user){
            if(user.password){
                const token = jwt.sign({_id:user._id},process.env.RESET_TOKEN,{expiresIn:'10m'});
                user.resetToken = token ? token : '';
                console.log('token',token)
                user.save()
                .then(data=>{
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        service: 'gmail',
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASS
                        }
                    });
        
                    let mailOptions = {
                        from: 'sbhangu110@gmail.com',
                        to: `${data.email}`,
                        subject: `Reset Password Link`,
                        html: `
                                <h2>Please click on given link to reset your Password</h2>
                                <h2>http://localhost:2000/reset</h2> 
                               `
                    }
                    transporter.sendMail(mailOptions, (err, mail) => {
                        if (err || !mail) {
                            return res.status(400).json({
                                success: false,
                                messege: 'Error in API',
                                error: err
                            })
        
                        }
                        if (mail) {
                            res.status(201).json({
                                success:true,
                                message:'Reset password Link has been sent.Kindly follow the given instructions',
                                resetToken:data.resetToken
                            })
                        }
                   })
                })
                .catch(error=>{
                    return res.status(400).json({
                        success:false,
                        message:'Error in API',
                        error:error
                    })
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    message:'Error in API',
                    error:err
                })
            }
        }
    })
}

//POST API for reset password
exports.resetPassword = (req,res) =>{
    const {resetToken} = req.params;

    const {newPassword,ConfirmPassword} = req.body;

    if(!newPassword && !ConfirmPassword){
        return res.status(500).json({
            success:false,
            message:'newPassword and ConfirmPassword fields cannot be left empty'
        })
    }

    userModel.findOne({resetToken:resetToken})
    .exec()
    .then(user=>{
        console.log('user',user)
        if(newPassword === ConfirmPassword){
        jwt.verify(resetToken,process.env.RESET_TOKEN,(err,decode)=>{
            if(err){
                console.log('error',err)
                return res.status(404).json({
                    success:false,
                    message:'Error in API',
                    error:err,
                    msg:console.log(err)
                })
            }
            if(decode){
                var resetPassword = CryptoJS.AES.encrypt(newPassword, process.env.SECRET_KEY).toString();
                let resettoken = '';
                user.resetToken = decode ? resettoken : user.resetToken;
                user.password = resetPassword ? resetPassword : user.password;
                user.save()
                .then(data=>{
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        service: 'gmail',
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASS
                        }
                    });
        
                    let mailOptions = {
                        from: 'sbhangu110@gmail.com',
                        to: `${data.email}`,
                        subject: `Your Authenticated Email and Password` ,
                        html: `
                                <h2>email: ${data.email}</h2>
                                <h2>password: ${newPassword} </h2> 
                               `
                    }
                    transporter.sendMail(mailOptions, (err, mail) => {
                        if (err || !mail) {
                            console.log('error',err)
                            return res.status(404).json({
                                success: false,
                                message: 'Error in API',
                                error: err
                            })
        
                        }
                        if (mail) {
                            console.log('TOKEN1',data.resetToken);
                            res.status(201).json({
                                success:true,
                                message:'Email has been sent.Kindly check your email and password',
                                resetToken:data.resetToken
                            })
                        }
                   })
                })
                .catch(error =>{
                    console.log('error',error)
                    return res.status(404).json({
                        success:false,
                        message:'Error in API',
                        error:error,
                        msg:console.log(error)
                    })
                })
            }
            else{
                let resettoken = '';
                user.resetToken = !decode ? resettoken : user.resetToken;
                user.save()
                .then(data=>{
                    console.log('TOKEN2',data.resetToken);
                   res.status(400).json({
                       success:false,
                       message:'Reset Password Link Expired',
                       resetToken:data.resetToken
                   })
                })
                .catch(error =>{
                    console.log('error',error)
                    return res.status(404).json({
                        success:false,
                        message:'Error in API',
                        error:error
                    })
                })
            }
        })
        }
        else{
            return res.status(404).json({
                success:false,
                message:'Please make sure both password and confirm password fields have same values',
                error:err
            })
        }
    })
    .catch(err=>{
        console.log('error',err)
        return res.status(404).json({
            success:false,
            message:'Error in API',
            error:err
        })
    })
}


// //POST API for logout 
// exports.logout=(req,res)=>{
//     try{
//     res.clearCookie('token');
//     res.status(202).json({
//         message:"User LoggedOut Successfully"
//     })
// }
// catch (error){
//     console.log(error);
// }
// }
