require("dotenv/config")

const express = require("express")
const router = express.Router()
const axios = require("axios")

//quick test route
router.get("/", (req, res) => {
    res.json({
        router: "get"
    })
})

//route to retrieve orders
router.get("/orders", (req, res) => {
    //axios options
    const options = {
        method: "get", 
        url: process.env.orders_url,
        headers: {
            "Authorization": process.env.secret_token,
            "User-Agent": "Yker-App"
        }
    }
    //axios get
    axios(options)
    .then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(response.data)
    })
    .catch((err) => {
        throw err
    })
})

module.exports = router