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
  console.log('req.body.centerIndex: ', req.body.centerIndex);
  const data =
    "username=ias&password=Import@123&grant_type=password&clientid=zdemo";
  const dataObj = {
    givenCenterId: req.body.centerIndex
  };
  const returnObj = {}
  const config = {
    headers: {
      "Content-Length": 0,
      "Content-Type": "text/plain",
    },
    responseType: "text",
  };
  console.log(dataObj.givenCenterId);
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
      // console.log('Centers in Response: ', centers);
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
      // console.log('guests: ', guests);
      // for(var i = 0; i < guests.length; i++) {
      //   console.log(guests.guest[i].personal_info.first_name)
      // }
      // guests.forEach(guest => console.log(guest.personal_info.first_name))
      // const printGuests = guests.map(name => { console.log('guest:', guests.personal_info.first_name)})
      dataObj.guests = guests.guests;
      return dataObj;
    })
    .then(async (dataObj) => {
      const therapists = await getTherapists(dataObj);
      // console.log("therapists: ", therapists);
      // console.log('therapists[9]: ', therapists[9].personal_info.first_name);
      // console.log('therapists[8]: ', therapists[8].personal_info.first_name);
      let therapistIndex1;
      let therapistIndex2;
      dataObj.therapists = [];
      console.log('dataObj centerID: ', dataObj.givenCenterId);
      if(dataObj.givenCenterId == 1) {
          console.log('in IF for Los Angles!');
          returnObj.chosenCenter = "Los Angles";
          dataObj.therapists[0] = therapists[11];
          dataObj.therapists[1] = therapists[12];
      }
      if(dataObj.givenCenterId == 8) {
        console.log('in IF for London');
        returnObj.chosenCenter = "London";
        dataObj.therapists[0] = therapists[7];
        dataObj.therapists[1] = therapists[9];
      }
      if(dataObj.givenCenterId == 4) {
        console.log('in IF for Hydrabad');
        returnObj.chosenCenter = "Hydrabad";
        dataObj.therapists[0] = therapists[8];
        dataObj.therapists[1] = therapists[9];
        dataObj.therapists[2] = therapists[10];

      }
      if(dataObj.givenCenterId == 2) {
        console.log('in IF for New York');
        returnObj.chosenCenter = "New York";
        dataObj.therapists[0] = therapists[6];
        dataObj.therapists[1] = therapists[7];
        dataObj.therapists[2] = therapists[8];

      }
      console.log('dataOBJ.therapists: ', dataObj.therapists);
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
      console.log("Back in App.js: ", bookingId);
      dataObj.bookingId = bookingId.bookingId;
      returnObj.guestFirst = bookingId.guestFirst;
      returnObj.guestLast = bookingId.guestLast;
      returnObj.serviceName = bookingId.serviceName;
      returnObj.therapistName= bookingId.therapistName;
      console.log("RETURN OBJ: ", returnObj);
      console.log("DataOBJ: ", dataObj.bookingId);
      return dataObj;
    })
    .then(async (dataObj) => {
      // // console.log("Getting Slots");
      const reservationSlots = await getReservationSlots(dataObj);
      dataObj.reservationSlots = reservationSlots;
      return dataObj;
    })
    .then(async (dataObj) => {
      console.log("About to reserve a slot");
      const reserveSlot1 = await reserveSlot(dataObj);
      console.log("ReserveSLOT:" + reserveSlot1.reservationId);
      returnObj.reservationTime = reserveSlot1.reservationTime;
      dataObj.reservationId = reserveSlot1;
      return dataObj;
    })
    .then(async (dataObj) => {
      console.log("about to confirm a booking");
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
      console.log("DONE!", returnObj);
      dataObj.success = true;
      returnObj.status = 200;
      res.json({returnObj});
      // res.sendFile(__dirname + "/started.html");
    })
    .catch((err) => {
      console.log("Return Obj: ", returnObj);
      returnObj.status = 400;
      res.json({returnObj});
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on 3000");
});
