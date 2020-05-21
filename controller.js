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
        const guests = response.data;
        // console.log("Guests in get Guests: ", guests);
        return guests;
    })
}
module.exports.getTherapists = async (dataObj) => {
  const center_Id = dataObj.centers[1].id;
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  return await axios.get(`https://api.zenoti.com/v1/centers/${center_Id}/therapists`, config)
    .then(response => {
        const therapists = response.data.therapists;
        // console.log("Guests in get Guests: ", guests);
        return therapists;
    })

}

module.exports.getMemberships = async (dataObj) => {
  const center_Id = dataObj.centers[1].id;
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  return await axios.get(`https://api.zenoti.com/v1/centers/${center_Id}/memberships`, config)
    .then(response => {
        const memberships = response.data.memberships;
        // console.log("Memberships in get Memberships: ", memberships);
        return memberships;
    })

}
module.exports.getBookingId = async (dataObj) => {
  // // console.log('bookingID Called: ');
  // // console.log("DATAOBJ:::::::: ", dataObj);
 var index = Math.floor(Math.random() * 10);
 console.log("GUESTIDINDEX: ", index);
  const center_Id = dataObj.centers[1].id;
  const guest_Id = dataObj.guests[index].id;
  const service_Id = dataObj.services[index].id;
  console.log('Index: ', index, '  GUESTS: ', dataObj.guests[index].personal_info.first_name + " " + dataObj.guests[index].personal_info.last_name);
  console.log('Index: ', index, ' Services: ', dataObj.services[index].name);
  // console.log("SERVICES: ", dataObj.services);
  // console.log('GUESTS: ', dataObj.guests[0].personal_info.first_name + " " + dataObj.guests[0].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[1].personal_info.first_name + " " + dataObj.guests[1].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[2].personal_info.first_name + " " + dataObj.guests[2].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[3].personal_info.first_name + " " + dataObj.guests[3].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[4].personal_info.first_name + " " + dataObj.guests[4].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[5].personal_info.first_name + " " + dataObj.guests[5].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[6].personal_info.first_name + " " + dataObj.guests[6].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[7].personal_info.first_name + " " + dataObj.guests[7].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[8].personal_info.first_name + " " + dataObj.guests[8].personal_info.last_name);
  // console.log('GUESTS: ', dataObj.guests[9].personal_info.first_name + " " + dataObj.guests[9].personal_info.last_name);
  dataObj.centerId = center_Id;
  dataObj.guestId = guest_Id;
  dataObj.service_Id = service_Id;
  // console.log("IN BOOKING ID: ", dataObj.guestId);
  // console.log("Center_ID: ", dataObj.centerId);
  // // console.log("center_ID: ", center_id, ":", dataObj.centers[1].name);
  // // console.log("Guest_ID: ", guest_id, ":", dataObj.guests[0].id);
  // // console.log()
  // // console.log("GuestID: ", dataObj.guests[0].id);
  // // console.log("ServiceID: ", dataObj.services[0].id);
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ (today.getDate() + 5);
  console.log("DATE: ", date);


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
  // // console.log("In get reservation ID controller");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId= dataObj.bookingId;
 // console.log("Booking ID: ", dataObj.bookingId);
  return await axios.get(`https://api.zenoti.com/v1/bookings/${bookingId}/slots?check_future_day_availability=true`, config)
    .then(response => {
      // console.log("reservationID: ", response.data);
      const reservationSlots = response.data.slots;
      return reservationSlots;
    })
  // https://api.zenoti.com/v1/bookings/0c318e4a-f90f-43fd-9c2d-6cba518e60ea/slots
}

module.exports.reserveSlot = async (dataObj) => {
  // // console.log("In Reserve Slot Controller");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId = dataObj.bookingId;
  // console.log("dataOBJ: ", dataObj.reservationSlots);
  console.log("RESERVATION SLOTS: ", dataObj.reservationSlots[0].Time);
  const reservationSlot = dataObj.reservationSlots[0].Time;
  const data = {
    "slot_time": reservationSlot
  }

  // // console.log("Reservation Slot: ", reservationSlot);
  return await axios.post(`https://api.zenoti.com/v1/bookings/${bookingId}/slots/reserve`, data, config)
    .then(response => {
      const reservationId = response.data.reservation_id;
      // // // console.log('Response for Reservation Slot: ', reservationId);
      return reservationId;
    })
}
module.exports.confirmBooking = async dataObj => {
  // // // console.log("In Confirm Booking");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId = dataObj.bookingId;
  // // // console.log("booking token", dataObj.tokenKey.access_token)
  // // // console.log('BookingID in confirm Booking: ', bookingId)
  // // // console.log('dataObj')
  return await axios.post(`https://api.zenoti.com/v1/bookings/${bookingId}/slots/confirm`, null, config)
    .then(response => {
      const invoiceId = response.data;
      return invoiceId;
    })
    .catch(err => console.log("error getting booking", err))
}
module.exports.retrieveCards = async dataObj => {
  // console.log("IN RETRIEVE CARDS CONTROLLER");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  // console.log("CONFIG: ", config);
  // console.log("GUEST_ID: ", dataObj.guestId);
  // console.log("CENTER_ID: ", dataObj.centerId);
  return await axios.get(`https://api.zenoti.com/v1/guests/${dataObj.guestId}/accounts?center_id=${dataObj.centerId}`,config)
    .then(response => {
      // console.log("ACCOUNTS: ", response.data.accounts);
      return response.data.accounts;
    })
    .catch(err => console.log("error getting accounts", err))

}
module.exports.getProducts = async (dataObj) => {
  const center_Id = dataObj.centers[1].id;
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  return await axios.get(`https://api.zenoti.com/v1/centers/${center_Id}/products`, config)
    .then(response => {
        const products = response.data.products;
        // console.log("Products in get Products: ", products);
        return products;
    })
}
module.exports.addProducts = async dataObj => {
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  var index = Math.floor(Math.random() * 10);
  // console.log("DataObj.products.id: ", dataObj.products[index]);
  var data = {
    products: [
      {
        id: dataObj.products[index].id,
        quantity: 3,
        sale_by_id: dataObj.therapists[index].id,
      }
    ]
  }
  const invoiceId = dataObj.invoiceId;
  // console.log("Products: ", dataObj.products);
  console.log("Product ID of Sold: ", dataObj.products[index].id);
  console.log("Product Name of Sold: ", dataObj.products[index].name);
  console.log("Therapist id: ", dataObj.therapists[index].id);
  console.log("Therapist id: ", dataObj.therapists[index].personal_info.first_name);
  console.log("INVOICEID: ", invoiceId);

  return await axios.put(`https://api.zenoti.com/v1/invoices/${invoiceId}/products`, data, config)
    .then(response => {
        console.log('Added Product to Invoice, RESPONSE: ', response.data);
        return response.data.invoice_id;
    }).catch(err => console.log("error paying card", err))

}
module.exports.addPayment = async dataObj => {
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const invoiceId = dataObj.invoiceId;
  // console.log("INVOICE_ID::::: ", invoiceId);
  const data = {
    account_id: dataObj.accountId,
    center_id: dataObj.centerId
  };
  // console.log("DATA: ", data);
  return await axios.post(`https://api.zenoti.com/v1/invoices/${invoiceId}/online_payments`, data, config)
    .then(response => {
        // console.log('RESPONSE: ', response.data);
        return response.data.invoice_transaction_id;
    }).catch(err => console.log("error paying card", err))

}
