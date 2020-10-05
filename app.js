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
  retrieveAppointmentGroupId,
  leaveFeedback
} = require("./controller.js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
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
      const tokenKey = response.data;
      dataObj.tokenKey = tokenKey;

      return dataObj;
    })
    .then(async (dataObj) => {
      const centers = await getCenter(dataObj);
      dataObj.centers = centers.centers;
      return dataObj;
    })
    .then(async (dataObj) => {
      const services = await getServices(dataObj);
      dataObj.services = services.services;
      return dataObj;
    })
    .then(async (dataObj) => {
      const guests = await getGuests(dataObj);
      dataObj.guests = guests.guests;
      return dataObj;
    })
    .then(async (dataObj) => {
      const therapists = await getTherapists(dataObj);
      let therapistIndex1;
      let therapistIndex2;
      dataObj.therapists = [];
      if(dataObj.givenCenterId == 1) {
          returnObj.chosenCenter = "Los Angles";
          dataObj.therapists[0] = therapists[11];
          dataObj.therapists[1] = therapists[12];
      }
      if(dataObj.givenCenterId == 8) {
        returnObj.chosenCenter = "London";
        dataObj.therapists[0] = therapists[7];
        dataObj.therapists[1] = therapists[9];
      }
      if(dataObj.givenCenterId == 4) {
        returnObj.chosenCenter = "Hydrabad";
        dataObj.therapists[0] = therapists[8];
        dataObj.therapists[1] = therapists[9];
        dataObj.therapists[2] = therapists[10];

      }
      if(dataObj.givenCenterId == 2) {
        returnObj.chosenCenter = "New York";
        dataObj.therapists[0] = therapists[6];
        dataObj.therapists[1] = therapists[7];
        dataObj.therapists[2] = therapists[8];

      }
      return dataObj;
    })
    .then(async (dataObj) => {
      const memberships = await getMemberships(dataObj);
      dataObj.memberships = memberships;
      return dataObj;
    })
    .then(async (dataObj) => {
      const bookingId = await getBookingId(dataObj);
      dataObj.bookingId = bookingId.bookingId;
      returnObj.guestFirst = bookingId.guestFirst;
      returnObj.guestLast = bookingId.guestLast;
      returnObj.serviceName = bookingId.serviceName;
      returnObj.therapistName= bookingId.therapistName;
      return dataObj;
    })
    .then(async (dataObj) => {
      const reservationSlots = await getReservationSlots(dataObj);
      dataObj.reservationSlots = reservationSlots;
      return dataObj;
    })
    .then(async (dataObj) => {
      const reserveSlot1 = await reserveSlot(dataObj);
      returnObj.reservationTime = reserveSlot1.reservationTime;
      dataObj.reservationId = reserveSlot1;
      return dataObj;
    })
    .then(async (dataObj) => {
      const invoiceId = await confirmBooking(dataObj);
      dataObj.invoiceId = invoiceId.invoice.invoice_id;
      return dataObj;
    })
    .then(async (dataObj) => {
      const account = await retrieveCards(dataObj);
      console.log("Account: ", account[0].account_id);
      dataObj.accountId = account[0].account_id;
      return dataObj;
    })
    .then(async (dataObj) => {
      const products = await getProducts(dataObj);
      dataObj.products = products;
      return dataObj;
    })
    .then(async (dataObj) => {
      const addedProductInvoiceId = await addProducts(dataObj);
      dataObj.addedProductInvoiceId = addedProductInvoiceId;
      return dataObj;
    })
    .then(async (dataObj) => {
       const appointmentGroupId = await retrieveAppointmentGroupId(dataObj);
       dataObj.appointmentGroupId = appointmentGroupId;
       return dataObj;
    })
    .then(async (dataObj) => {
      const feedback = await leaveFeedback(dataObj);
      returnObj.rating = feedback;
      return dataObj;
    })
    .then(async (dataObj) => {
      const invoice_transaction_id = await addPayment(dataObj);
      dataObj.success = true;
      returnObj.status = 200;
      res.json({returnObj});
    })
    .catch((err) => {
      returnObj.status = 400;
      res.json({returnObj});
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on 3000");
});
