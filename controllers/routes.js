require("dotenv/config");

const express = require("express");
const router = express.Router();
const axios = require("axios");
//quick test route
router.get("/", (req, res) => {
  res.json({
    router: "get",
  });
});

// axios options
const options = {
  method: "get",
  url: process.env.orders_url,
  headers: {
    Authorization: process.env.secret_token,
    "User-Agent": "Yker-App",
  },
};
const getAllOrders = async () => {
  let allUrls = [];
  while (true) {
    console.log("inside the while");
    let res = await axios(options);
    if (!res.data["pagination"]["nextPageUrl"]) {
      console.log("bout to break");
      break;
    }
    let nextUrl = await res.data["pagination"]["nextPageUrl"];
    allUrls.push(nextUrl);
    options["url"] = nextUrl;
  }
  return {
    urls: allUrls,
  };
};
//route to retrieve orders
router.get("/orders", (req, res) => {
  //   const allUrls = await getAllOrders();
  //   res.json(allUrls)

  axios(options)
    .then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
