const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const axios = require("axios");
const {getCenter, getServices, getGuests, getBookingId, getReservationSlots, reserveSlot} = require("./controller.js")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
  const data = "username=zdemo&password=Zenoti@2010&grant_type=password&clientid=zdemo";
  const dataObj = {};
  const config = {
    headers: {
        'Content-Length': 0,
        'Content-Type': 'text/plain'
    },
   responseType: 'text'
};
  axios.post(`https://api.zenoti.com/Token`, data, config)
  .then(response => {
        console.log("tokennnn", response.data);
        const tokenKey = response.data;
        dataObj.tokenKey = tokenKey;
        return dataObj;
    })
    .then(async dataObj => { // get centers
      // console.log('in Next response: ', tokenKey);
      const centers = await getCenter(dataObj);
      // console.log('Centers in Reponse: ', centers);
      dataObj.centers = centers.centers;
      return dataObj;
    })
    .then(async dataObj => {
      const services = await getServices(dataObj);
      // console.log("Services in App.JS", services.services);
      dataObj.services = services.services;
      return dataObj;
    })
    .then(async dataObj => {
      // console.log("In Guests dataOBJ: ", dataObj);
      const guests = await getGuests(dataObj);
      // console.log("Guests in App.JS: ", guests);
      dataObj.guests = guests.guests;
      return dataObj;
    }).then(async dataObj => {
      console.log('About to call getBookingId');
      const bookingId = await getBookingId(dataObj);
      console.log("Back in App.js: ", bookingId);
      dataObj.bookingId = bookingId;
      return dataObj;
    }).then(async dataObj => {
      console.log('Getting Slots');
      const reservationSlots = await getReservationSlots(dataObj);
      dataObj.reservationSlots = reservationSlots;
      return dataObj;
    }).then( async dataObj => {
        console.log('About to reserve a slot');
        const reserveSlot = await reserveSlot(dataObj);
    })
    .catch(err => console.log('error'));
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on 3000');
})
