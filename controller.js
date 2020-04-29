const axios = require("axios");

module.exports.getCenter = async (dataObj) => {
  // console.log('in Get Center Controller', dataObj);
  var centers;
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  return await axios.get("https://api.zenoti.com/v1/centers", config)
  .then(response =>  {
     centers = response.data;
     return centers;
  })
  .catch(err => console.log("Error in getting centers: " + err));
  // return centers;
}
module.exports.getServices = async  (dataObj) => {
  // console.log('In services Controller: centerID: ', dataObj.centers[1].id);
  const center_Id = dataObj.centers[1].id;
  console.log("Center ID "  + center_Id);
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  return await axios.get(`https://api.zenoti.com/v1/centers/${center_Id}/services`, config)
    .then(response => {
        const services = response.data;
        // console.log('Services in controller: ', services);
        return services;
    })
    .catch(err => console.log("Error in Getting Services: ", err))
}
module.exports.getGuests = async (dataObj) => {
  const center_Id = dataObj.centers[1].id;
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  // console.log("In Controller getting Guests: ", dataObj);
  const url = `https://api.zenoti.com/v1/guests/center_id=${center_Id}`;
  console.log("URL: ", url);
  return await axios.get(`https://api.zenoti.com/v1/guests?center_id=${center_Id}`, config)
    .then(response => {
        // console.log("in response of guest: ", response);
        const guests = response.data;
        // console.log("Guests in get Guests: ", guests);
        return guests;
    })
}
module.exports.getBookingId = async (dataObj) => {
  // console.log('bookingID Called: ');
  const center_Id = dataObj.centers[1].id;
  const guest_Id = dataObj.guests[0].id;
  const service_Id = dataObj.services[0].id;
  // console.log("GuestID: ", dataObj.guests[0].id);
  // console.log("ServiceID: ", dataObj.services[0].id);
  const date = "2020-03-26";
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const data = {
    "center_id" : center_Id,
    "date": date,
    "is_only_catalog_employees" : "false",
    "guests": [
      {
        "id": guest_Id,
        "items": [
          {
            "item": {
              "id": service_Id
            }
          }
        ]
      }
    ]
  }
  return await axios.post("https://api.zenoti.com/v1/bookings", data, config)
  .then(response => {
    const bookingId = response.data.id;
    return bookingId;
  })
}
module.exports.getReservationSlots = async (dataObj) => {
  // console.log("In get reservation ID controller");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId= dataObj.bookingId;
  console.log('BookingID in get Reservation: ', bookingId)
  return await axios.get(`https://api.zenoti.com/v1/bookings/${bookingId}/slots`, config)
    .then(response => {
//    console.log("reservationID: ", response.data);
      const reservationSlots = response.data.slots;
      return reservationSlots;
    })
  // https://api.zenoti.com/v1/bookings/0c318e4a-f90f-43fd-9c2d-6cba518e60ea/slots
}

module.exports.reserveSlot = async (dataObj) => {
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId = dataObj.bookingId;
  // console.log("RESERVATION SLOTS: ", dataObj.reservationSlots[0].Time);
  const reservationSlot = dataObj.reservationSlots[2].Time;
  const data = {
    "slot_time": reservationSlot
  }

  console.log("Reservation Slot: ", reservationSlot);
  return await axios.post(`https://api.zenoti.com/v1/bookings/${bookingId}/slots/reserve`, data, config)
    .then(response => {
      const reservationId = response.data.reservation_id;
      console.log('Response for Reservation Slot: ', reservationId);
      return reservationId;
    })
}
module.exports.confirmBooking = async dataObj => {
  console.log("In Confirm Booking");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId = dataObj.bookingId;
  console.log("booking token", dataObj.tokenKey.access_token)
  console.log('BookingID in confirm Booking: ', bookingId)
  return await axios.post(`https://api.zenoti.com/v1/bookings/${bookingId}/slots/confirm`, null, config)
    .then(response => {
//    console.log("reservationID: ", response.data);
      const invoiceId = response.data;
      return invoiceId;
    })
    .catch(err => console.log("error getting booking", err))
}
