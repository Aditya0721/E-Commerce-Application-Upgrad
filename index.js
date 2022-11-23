const express = require("express")
const mongoose = require("mongoose")
const userModel = require("./models/user.model")

const app = express()

app.listen(8000,()=>{
    console.log("server started")
})

mongoose.connect("mongodb://localhost/Eshop")
.then(()=>{
    console.log("DataBase connected")
})
.catch(()=>console.log("Error Occured"))