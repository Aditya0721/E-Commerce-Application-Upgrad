const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const { response } = require("express");

exports.signUp = async(req, res)=>{

    try{
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,
            contactNumber: req.body.contactNumber
        }
        user.userId = "1"
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

