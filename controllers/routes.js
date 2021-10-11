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
    let allOrders = {}
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
    // axios(options)
    // .then((response) => {
    //     allOrders = {
    //         ...allOrders,
    //         ...response.data
    //     }
    //     let next_page = response.data["pagination"]["hasNextPage"]
    //     while(next_page){
    //         options["url"] = response.data["pagination"]["nextPageUrl"]
    //         axios(options)
    //         .then((nextPage) => {
    //             next_page = nextPage.data["pagination"]["hasNextPage"]
    //             console.log(next_page)
    //             allOrders = {
    //                 ...allOrders,
    //                 ...nextPage.data
    //             }
    //         })
    //     }
    // })
    .catch((err) => {
        throw err
    })
})

module.exports = router