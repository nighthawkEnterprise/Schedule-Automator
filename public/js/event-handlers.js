const username = document.getElementById("username");
const password = document.getElementById("password");
const startLosBtn = document.getElementById("startLos");
const startLonBtn = document.getElementById("startLond");
const startHydrBtn = document.getElementById("startHydra");
const startNyBtn = document.getElementById("startNy");
const createAllBtn = document.getElementById("createAll");
// const stopBtn  = document.getElementById("stop");
var intervalID;

function start(centerIndex) {
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
    console.log(res);
     console.log("DONE");
     res.json()
   });
}
createAllBtn.addEventListener("click", (event) => {
  console.log("In Create All Event");
  event.preventDefault();
  start(1);
  // start(4);
  start(8);
});
startLosBtn.addEventListener("click", (event) => {
  console.log("here");
  event.preventDefault();
  start(1);
  // intervalID = setInterval(() => {
  //   start();
  // }, 15000);

  // console.log("intervalID start", intervalID);
});
startLonBtn.addEventListener("click", (event) => {
  console.log("here again");
  event.preventDefault();
  start(8);
  // intervalID = setInterval(() => {
  //   start();
  // }, 15000);

  // console.log("intervalID start", intervalID);
});
startHydrBtn.addEventListener("click", (event) => {
  event.preventDefault();
  start(4);
  // intervalID = setInterval(() => {
  //   start();
  // }, 15000);

  // console.log("intervalID start", intervalID);
});
startNyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  start(2);
  // intervalID = setInterval(() => {
  //   start();
  // }, 15000);

  // console.log("intervalID start", intervalID);
});
// stopBtn.addEventListener("click", () => {
//     event.preventDefault();
//     clearInterval(intervalID);
//
//     console.log("stop Interval", intervalID);
//   });
