const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.text({type:"*/*"}));
// app.use(express.json())
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
        Yker: "BackEnd"
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening for requests")
})

module.exports = app