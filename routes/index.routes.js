const express = require("express")
const router = express.Router()
const authRouter = require("./auth.routes")

router.use("/auth", authRouter)

router.all('*', (req, res)=>{
    return res.status(404).send("invalid url")
})
module.exports = router