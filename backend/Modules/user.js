const mongoose = require('mongoose');

var  conn = mongoose.Collection;

var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        min:3,
        max:20,
        trim:true,
        default:''
    },
    lastName:{
        type:String,
        min:3,
        max:20,
        trim:true,
        default:''
    },
    email:{
        type:String,
        lowercase:true,
        index:true,
        unique:true,
        trim:true,
        default:''
    },
    username:{
        type:String,
        lowercase:true,
        index:true,
        unique:true,
        trim:true,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    profile:{
        type:String,
        default:''
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    address:{
        type:String,
        min:3,
        max:100,
        default:''
    },
    resetToken:{
        type:String,
        default:''
    }
},{timestamps:true});

userSchema.virtual('fullname')
.get(()=>{
    return `${this.firstName} ${this.lastName}`
})

var userModel = mongoose.model('users',userSchema);

module.exports = userModel;



