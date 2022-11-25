const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

exports.verifyToken = (req, res, next)=>{

    const token = req.header("x-auth-token") 
    console.log(token)

    if(!token){
        res.status(403).json({
            error:"Token Not Found"
        })
    }

    jwt.verify(token, "SECRET SALT", (err, decoded)=>{
        if(err){
            res.status(401).json({
                error:"Unauthorized"
            })
        }
        console.log(decoded)
        req.email = decoded.email
        console.log(req.email)
    })
    next()
}