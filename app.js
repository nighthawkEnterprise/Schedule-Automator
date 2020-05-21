const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const {
  getCenter,
  getServices,
  getGuests,
  getBookingId,
  getReservationSlots,
  reserveSlot,
  confirmBooking,
  retrieveCards,
  addPayment,
  getProducts,
  getTherapists,
  addProducts,
  getMemberships,
} = require("./controller.js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log("Going to call");
  const data =
    "username=zdemo&password=Zenoti@2010&grant_type=password&clientid=zdemo";
  const dataObj = {};
  const config = {
    headers: {
      "Content-Length": 0,
      "Content-Type": "text/plain",
    },
    responseType: "text",
  };

  axios
    .post(`https://api.zenoti.com/Token`, data, config)
    .then((response) => {
      // console.log("tokennnn", response.data);
      const tokenKey = response.data;
      dataObj.tokenKey = tokenKey;

      return dataObj;
    })
    .then(async (dataObj) => {
      // get centers
      // // console.log('in Next response: ', tokenKey);
      const centers = await getCenter(dataObj);
      // // console.log('Centers in Reponse: ', centers);
      dataObj.centers = centers.centers;
      return dataObj;
    })
    .then(async (dataObj) => {
      const services = await getServices(dataObj);
      // // console.log("Services in App.JS", services.services);
      dataObj.services = services.services;
      return dataObj;
    })
    .then(async (dataObj) => {
      // // console.log("In Guests dataOBJ: ", dataObj);
      const guests = await getGuests(dataObj);
      // // console.log("Guests in App.JS: ", guests);
      dataObj.guests = guests.guests;
      return dataObj;
    })
    .then(async (dataObj) => {
      const therapists = await getTherapists(dataObj);
      dataObj.therapists = therapists;
      return dataObj;
    })
    .then(async (dataObj) => {
      const memberships = await getMemberships(dataObj);
      // memberships.map(membership=> console.log("Membership: ", membership.name));
      dataObj.memberships = memberships;
      return dataObj;
    })
    .then(async (dataObj) => {
      // console.log("About to call getBookingId");
      const bookingId = await getBookingId(dataObj);
      // // console.log("Back in App.js: ", bookingId);
      dataObj.bookingId = bookingId;
      return dataObj;
    })
    .then(async (dataObj) => {
      // // console.log("Getting Slots");
      const reservationSlots = await getReservationSlots(dataObj);
      dataObj.reservationSlots = reservationSlots;
      return dataObj;
    })
    .then(async (dataObj) => {
      // // console.log("About to reserve a slot");
      const reserveSlot1 = await reserveSlot(dataObj);
      // // // console.log("ReserveSLOT:" + reserveSlot1);
      dataObj.reservationId = reserveSlot;
      return dataObj;
    })
    .then(async (dataObj) => {
      // // console.log("about to confirm a booking");
      const invoiceId = await confirmBooking(dataObj);
      // // console.log("Invoice ID: ", invoiceId);
      dataObj.invoiceId = invoiceId.invoice.invoice_id;
      console.log("invoiceID: ", invoiceId.invoice.invoice_id);
      return dataObj;
    })
    .then(async (dataObj) => {
      const account = await retrieveCards(dataObj);
      console.log("Account: ", account[0].account_id);
      dataObj.accountId = account[0].account_id;
      // console.log("dataObj: ", dataObj.accountId);
      return dataObj;
    })
    .then(async (dataObj) => {
      const products = await getProducts(dataObj);
      // console.log("PRODUCTS: ", products);
      dataObj.products = products;
      return dataObj;
    })
    .then(async (dataObj) => {
      const addedProductInvoiceId = await addProducts(dataObj);
      console.log("App, addedProductInvoiceId: ", addedProductInvoiceId);
      dataObj.addedProductInvoiceId = addedProductInvoiceId;
      return dataObj;
    })
    .then(async (dataObj) => {
      const invoice_transaction_id = await addPayment(dataObj);
      console.log("invoice_transaction_id: ", invoice_transaction_id);
      console.log("DONE!");
      res.sendFile(__dirname + "/started.html");
    })
    .catch((err) => console.log("error", err));
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on 3000");
});
