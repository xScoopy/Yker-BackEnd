require("dotenv/config");

//middleware
const express = require('express')
const router = express.Router();
const axios = require("axios");
// Database connection
const mongoose = require("mongoose");
const DB_URI = process.env.MONGO_URI;
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("Connected to DB");
});

// import customerNote model
const CustomerNotes = require("../models/customerNotes");

//quick test route
router.get("/", (req, res) => {
  res.json({
    router: "get",
  });
});

// axios options for our api call
const options = {
  method: "get",
  url: process.env.orders_url,
  headers: {
    Authorization: process.env.secret_token,
    "User-Agent": "Yker-App",
  },
};
const orderOptions = {
  method: "get",
  url: process.env.specific_order_url,
  headers: {
    Authorization: process.env.secret_token,
    "User-Agent":"Yker-App"
  }
};

// All orders function
// **Returns a json object with the key of 'urls' 
// and the value of an array containing all of the urls. 
// This function could be modified to return all orders 
// and order information, but is expensive in terms of time. 
// const getAllOrders = async () => {
//   let allUrls = [];
//   while (true) {
//     console.log("inside the while");
//     let res = await axios(options);
//     if (!res.data["pagination"]["nextPageUrl"]) {
//       console.log("bout to break");
//       break;
//     }
//     let nextUrl = await res.data["pagination"]["nextPageUrl"];
//     allUrls.push(nextUrl);
//     options["url"] = nextUrl;
//   }
//   return {
//     urls: allUrls,
//   };
// };

//route to retrieve orders
router.get("/orders", (req, res) => {
  axios(options)
    .then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//route to retrieve a specific order based on orderID
router.get("/orders/:orderNumber", (req, res) => {
  thisOrderUrl = process.env.specific_order_url + req.params.orderNumber
  orderOptions['url'] = thisOrderUrl
  axios(orderOptions)
  .then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  })
  .catch((err) => { 
    console.log(err);
  })
})

//route to get notes on a specific customer by passing email as a parameter
router.get("/notes/:customerEmail", (req, res) => {
  CustomerNotes.findOne({ email: req.params.customerEmail })
    .then((result) => {
      if (!result) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.send([]);
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.send(result["notes"]);
      } 
    })
    .catch((err) => {
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.send({ err: err.message });
    });
});

//route to add notes to the db. Attaches to the collection that corresponds with the email passed as a parameter. 
router.post("/notes/:customerEmail", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  CustomerNotes.findOne({ email: req.params.customerEmail })
    .then((customer) => {
      if (!customer) {
        let newCustomerNotes = new CustomerNotes({
          email: req.params.customerEmail,
          notes: req.body['notes'],
        });
        newCustomerNotes
          .save()
          .then( async (newCustomer) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            return res.send({ 'notes': newCustomer['notes'] });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(req.body)
        customer.notes.push(req.body);
        customer
          .save()
          .then((updatedNotes) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            return res.send({ 'notes': updatedNotes['notes'] });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
