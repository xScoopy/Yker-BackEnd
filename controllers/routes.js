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
  let allUrls = []
  while (true) {
    console.log("inside the while");
    let res = await axios(options);
    if (!res.data["pagination"]["nextPageUrl"]) {
      console.log("bout to break");
      break;
    }
    let nextUrl = await res.data["pagination"]["nextPageUrl"];
    allUrls.push(nextUrl)
    options["url"] = nextUrl;
    
  }
  return { 
      urls: allUrls
  }
};
//route to retrieve orders
router.get("/orders", (req, res) => {
//   const allUrls = await getAllOrders();
//   res.json(allUrls)

  //axios options
  const options = {
      method: "get",
      url: process.env.orders_url,
      headers: {
          "Authorization": process.env.secret_token,
          "User-Agent": "Yker-App"
      }
  }
  axios(options)
  .then((response) => {
    res.json(response.data)
  })

  // let lastUrl = []
  // while(options["url"] != null){
  //     axios(options)
  //     .then((res) => {
  //         options["url"] = res.data["pagination"]["nextPageUrl"]
  //         console.log(res.data["pagination"]["nextPageUrl"])
  //     })
  //     .catch((err) => {
  //         console.log(err)
  //     })
  // }
  //axios get
  // axios(options)
  // .then((response) => {
  //     res.setHeader("Access-Control-Allow-Origin", "*")
  //     res.json(response.data)
  // })
  // .catch((err) => {
  //     throw err
  // })
  //attempt2
  // axios(options)
  // .then((response) => {
  //     allOrders = {
  //         ...allOrders,
  //         ...response.data
  //     }
  //     options["url"] = response.data["pagination"]["nextPageUrl"]
  //     console.log("right before while loop")
  //     while(options["url"]){
  //         console.log("inside while loop")
  //         axios(options)
  //         .then((nextPage) => {
  //             console.log("inside then inside while loop")
  //             allOrders = {
  //                 ...allOrders,
  //                 ...nextPage.data
  //             }
  //             console.log("right before changing url in while loop")
  //             options["url"] = nextPage.data["pagination"]["nextPageUrl"]
  //             console.log(options["url"])
  //         })
  //         .catch((err) => {
  //             console.log(err)
  //         })
  //     }
  // })
  // .catch((err) => {
  //     throw err
  // })
  // console.log("all orders: " + allOrders)
});

module.exports = router;
