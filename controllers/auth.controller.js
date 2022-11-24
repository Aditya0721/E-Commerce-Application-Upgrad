const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.signUp = async(req, res)=>{

    try{
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,
            contactNumber: req.body.contactNumber
        }
        const lastUserId = await userModel.find({},{_id:0, userId:1}).sort({_id:-1}).limit(1)
        if(lastUserId.length==0){
            user.userId = "U"+new Date().getFullYear()+"Id"+1
        }
        else{
            console.log(lastUserId)
            str = lastUserId[0].userId
            count = str[str.length-1]
            console.log(count)
            user.userId = "U"+new Date().getFullYear()+"Id"+(++count)
        }

        const responseObject = await userModel.create(user)

        return res.status(200).json({
            data: responseObject,
            message: "user created Successfully"
        })
    }

    catch(err){
        console.log(err)
        return res.status(400).send({
            err
        })
    }
}

exports.signIn = async(req, res)=>{
    
    //jwt token
    const token = jwt.sign({firstName:req.user.firstName, role:req.user.role, issuedAt: new Date()}, "SECRET SALT",{
        expiresIn:600
    })

    res.setHeader("x-auth-token", token)

    res.status(200).json({
        email: req.body.email,
        name: req.user.firstName,
        isAuthenticated: true
    })
} 

