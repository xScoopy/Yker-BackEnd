const express = require("express");
const app = express();
const cors = require("cors")

const router = require("./controllers/index.js")
app.use(router)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
})

app.get("/", (req, res) => {
    res.json({
        Hello: "World"
    })
})

app.listen(3000, () => {
    console.log("Listening for requests")
})