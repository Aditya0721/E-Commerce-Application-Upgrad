const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

exports.verifyToken = (req, res, next)=>{

    const token = req.header("x-auth-token") 
    console.log(token)

    if(!token){
        res.status(403).json({
            error:"Please login first to access this endpoint!"
        })
    }

    jwt.verify(token, "SECRET SALT", (err, decoded)=>{
        if(err){
            res.status(401).json({
                error:"Unauthorized"
            })
        }
        req.email = decoded.email
    })
    next()
}