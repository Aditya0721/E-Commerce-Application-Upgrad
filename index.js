const express = require("express")
const mongoose = require("mongoose")
const userModel = require("./models/user.model")
const routes = require("./routes/index.routes")

const app = express()

app.use(express.json())

app.listen(8000,()=>{
    console.log("server started")
})

app.use('/eshop', routes)

app.all('*', (req, res)=>{
    return res.status(404).send("invalid url")
})

mongoose.connect("mongodb://localhost/Eshop")
.then(()=>{
    console.log("DataBase connected")
})
.catch(()=>console.log("Error Occured"))