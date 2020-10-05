const axios = require("axios");

module.exports.getCenter = async (dataObj) => {
  console.log('in Get Center Controller');
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
}
module.exports.getServices = async  (dataObj) => {
  const center_Id = dataObj.centers[dataObj.givenCenterId].id;
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
        return services;
    })
    .catch(err => console.log("Error in Getting Services: ", err))
}
module.exports.getGuests = async (dataObj) => {
  const center_Id = dataObj.centers[dataObj.givenCenterId].id;
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  const url = `https://api.zenoti.com/v1/guests/center_id=${center_Id}`;
  console.log("URL: ", url);
  return await axios.get(`https://api.zenoti.com/v1/guests?center_id=${center_Id}`, config)
    .then(response => {
        const guests = response.data;
        return guests;
    })
}
module.exports.getTherapists = async (dataObj) => {
  const center_Id = dataObj.centers[dataObj.givenCenterId].id;
  console.log('getTherapist: ', center_Id);
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
        return therapists;
    })

}

module.exports.getMemberships = async (dataObj) => {
  const center_Id = dataObj.centers[dataObj.givenCenterId].id;
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
        return memberships;
    })

}
module.exports.getBookingId = async (dataObj) => {
 var index = Math.floor(Math.random() * 10);
 const returnObj = {};
 if(index % 2 === 0 ) {
   var therapistIndex = 1;
 } else {
   therapistIndex = 0;
 }
  const center_Id = dataObj.centers[dataObj.givenCenterId].id;
  const guest_Id = dataObj.guests[index].id;
  const service_Id = dataObj.services[index].id;
  const therapist_Id = dataObj.therapists[therapistIndex].id;
  dataObj.chosenTherapistID = therapist_Id;
  dataObj.chosenTherapistName = dataObj.therapists[therapistIndex].name;

  // console.log('Index: ', index, '  GUESTS: ', dataObj.guests[index].personal_info.first_name + " " + dataObj.guests[index].personal_info.last_name);
  // console.log('Index: ', index, ' Services: ', dataObj.services[index].name);
  // console.log('Index: ', therapistIndex ,  ' Therapist: ', dataObj.therapists[therapistIndex].personal_info.name);

  returnObj.guestFirst =  dataObj.guests[index].personal_info.first_name;
  returnObj.guestLast = dataObj.guests[index].personal_info.last_name;
  returnObj.therapistName = dataObj.therapists[therapistIndex].personal_info.name;
  returnObj.serviceName = dataObj.services[index].name;

  dataObj.centerId = center_Id;
  dataObj.guestId = guest_Id;
  dataObj.service_Id = service_Id;
  var today = new Date();
  const date = new Date(today);
  date.setDate(date.getDate() + 5);

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
              "id": service_Id,
            },
            "therapist": {
               "Id": therapist_Id,
               "Gender": 0
            }
          }

        ]
      }
    ]
  }
  return await axios.post("https://api.zenoti.com/v1/bookings", data, config)
  .then(response => {
    const bookingId = response.data.id;
    returnObj.bookingId = bookingId;
    // console.log("BOOKINGID: ", bookingId);
    return returnObj;
  })
}
module.exports.getReservationSlots = async (dataObj) => {
  console.log("In get reservation ID controller");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId= dataObj.bookingId;
 console.log("Booking ID: ", dataObj.bookingId);
  return await axios.get(`https://api.zenoti.com/v1/bookings/${bookingId}/slots?check_future_day_availability=true`, config)
    .then(response => {
      const reservationSlots = response.data.slots;
      return reservationSlots;
    })
}

module.exports.reserveSlot = async (dataObj) => {
  console.log("In Reserve Slot Controller");
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId = dataObj.bookingId;
  let returnObj = {};
   returnObj.reservationTime = dataObj.reservationSlots[0].Time;

  const reservationSlot = dataObj.reservationSlots[0].Time;
  const data = {
    "slot_time": reservationSlot
  }

  return await axios.post(`https://api.zenoti.com/v1/bookings/${bookingId}/slots/reserve`, data, config)
    .then(response => {
      console.log(response.data.invoices[0].items);
      const reservationId = response.data.reservation_id;
      returnObj.reservationId = reservationId;
      return returnObj;
    })
}
module.exports.confirmBooking = async dataObj => {
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };
  const bookingId = dataObj.bookingId;
  return await axios.post(`https://api.zenoti.com/v1/bookings/${bookingId}/slots/confirm`, null, config)
    .then(response => {
      const invoiceId = response.data;
      return invoiceId;
    })
    .catch(err => console.log("error getting booking", err))
}
module.exports.retrieveCards = async dataObj => {
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  };

  return await axios.get(`https://api.zenoti.com/v1/guests/${dataObj.guestId}/accounts?center_id=${dataObj.centerId}`,config)
    .then(response => {
      return response.data.accounts;
    })
    .catch(err => console.log("error getting accounts", err))

}
module.exports.getProducts = async (dataObj) => {
  const center_Id = dataObj.centers[dataObj.givenCenterId].id;
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
  var data = {
    products: [
      {
        id: dataObj.products[index].id,
        quantity: 3,
        sale_by_id: dataObj.chosenTherapistID,
      }
    ]
  }
  const invoiceId = dataObj.invoiceId;
  return await axios.put(`https://api.zenoti.com/v1/invoices/${invoiceId}/products`, data, config)
    .then(response => {
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
        return response.data.invoice_transaction_id;
    }).catch(err => console.log("error paying card", err))
}
module.exports.retrieveAppointmentGroupId = async dataObj => {
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  const invoiceId = dataObj.invoiceId;
  return await axios.get(`https://api.zenoti.com/v1/invoices/${invoiceId}?expand=InvoiceItems&expand=Transactions`, config)
    .then(response => {
        return response.data.invoice.appointment_group_id;
    }).catch(err => console.log("error getting Invoice Details", err))
}
module.exports.leaveFeedback = async dataObj => {
  const config = {
    headers: {
      'application_name' : "zdemo",
      'application_version' : "11.43",
      'Authorization' : 'bearer ' + dataObj.tokenKey.access_token
    }
  }
  const optionalFeedbacks = [
    {
      "comments": "Extremely professional and high-quality service!",
      "rating": 5,
      "apply_for_group_invoice": true
    },
    {
      "comments": "Mostly Great, I wish it could have been better check in process!",
      "rating": 4,
      "apply_for_group_invoice": true
    },
    {
      "comments": "Great, a little curt, but professional!",
      "rating": 4,
      "apply_for_group_invoice": true
    },
    {
      "comments": "Did not provide online booking, had to call front desk :/!",
      "rating": 1,
      "apply_for_group_invoice": true
    }
  ]
  const randomInt = Math.floor(Math.random() * Math.floor(4));
  const data = optionalFeedbacks[randomInt];
  const appointmentGroupId = dataObj.appointmentGroupId;
  return await axios.post(`https://api.zenoti.com/v1/appointments/${appointmentGroupId}/feedbacks`, data, config)
    .then(response => {
      const feedbackRating = data.rating;
      return feedbackRating;
    })
    .catch(err => console.log("error getting booking", err))

}
