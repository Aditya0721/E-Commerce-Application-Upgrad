const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true ,
        lowercase : true,
        minLength : 10
    },
    createdAt : {
        type : Date,
        immutable  : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        } 
    },
    role : {
        type : String,
        required : true,
        default : "USER",
        enum : ["USER", "ADMIN"]
    },
    contactNumber :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("users", userSchema)