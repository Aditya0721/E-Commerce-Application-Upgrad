const addressController =  require("../controllers/address.controller")
const express = require("express")
const addressRouter = express.Router()
const authjwt = require("../middlewares/authjwt")

addressRouter.post("/", [authjwt.verifyToken], addressController.createAddress)

module.exports = addressRouter