const username = document.getElementById("username");
const password = document.getElementById("password");

const startLosBtn = document.getElementById("startLos");
const startLonBtn = document.getElementById("startLond");
const startHydrBtn = document.getElementById("startHydra");
const startNyBtn = document.getElementById("startNy");
const createAllBtn = document.getElementById("createAll");

const clearApptsBtn = document.getElementById("clear-appointment-notifications");
const clearEmployeeBtn = document.getElementById("clear-employee-notifications");

const notificationScreenList = document.getElementById("notification-appointment");

const employeeHeader = document.getElementById("employee-header");
const appointmentHeader = document.getElementById("appointment-header");




// creating a loader div and loading animation holder
const loaderDiv = document.createElement("div");
const loader = document.createElement("div");
loader.setAttribute("class", "loader");
loaderDiv.setAttribute("id", "loader-div");
loaderDiv.appendChild(loader);

function start(centerIndex) {
  notificationScreenList.appendChild(loaderDiv);
  axios("/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    data: {
      username: username.value,
      password: password.value,
      centerIndex: centerIndex,
    },
  }).then((res) => {
      loaderDiv.remove();
      console.log(res.data);
      console.log("Status: ", res.data.returnObj);

      if(res.data.status !== 400) {
          let info = res.data.returnObj;
          let firstName = info.guestFirst;
          let lastName = info.guestLast;
          let serviceName = info.serviceName;
          let chosenCenter = info.chosenCenter;
          let therapistName = info.therapistName;
          let reservationTime = info.reservationTime;
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`${firstName} ${lastName}'s appointment for a ${serviceName} with ${therapistName} at the ${chosenCenter} on ${reservationTime}`));
          li.setAttribute("class", "list-group-item");
          notificationScreenList.appendChild(li);
      } else {
        console.log("in error block", res.data);
        let info = res.data;
        let firstName = info.guestFirst;
        let lastName = info.guestLast;
        let serviceName = info.serviceName;
        let chosenCenter = info.chosenCenter;
        let therapistName = info.therapistName;
        loaderDiv.remove();
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(`There was an error creating ${firstName} ${lastName}'s appointment for a ${serviceName} with ${therapistName} at the ${chosenCenter}`));
        li.setAttribute("class", "list-group-item");
        li.setAttribute("id", "errorText");
        notificationScreenList.appendChild(li);
      }
    })
}
createAllBtn.addEventListener("click", (event) => {
  console.log("In Create All Event");
  event.preventDefault();
  start(1);
  start(8);
  start(2);
});
startLosBtn.addEventListener("click", (event) => {
  console.log("here");
  event.preventDefault();
  start(1);
});
startLonBtn.addEventListener("click", (event) => {
  console.log("here again");
  event.preventDefault();
  start(8);
});
startHydrBtn.addEventListener("click", (event) => {
  event.preventDefault();
  start(4);
});
startNyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  start(2);
});

clearApptsBtn.addEventListener("click", (event) => {
  console.log(notificationScreenList.childNodes);
  while(notificationScreenList.childNodes.length > 2) {
    notificationScreenList.removeChild(notificationScreenList.lastChild);
  }
})
