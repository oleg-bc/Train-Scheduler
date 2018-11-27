// Initialize Firebase
var config = {
  apiKey: "AIzaSyCumlK3Eb-6KunNpjOxdOGvbzPPt1rLlXE",
  authDomain: "train-scheduler-fe7cc.firebaseapp.com",
  databaseURL: "https://train-scheduler-fe7cc.firebaseio.com",
  projectId: "train-scheduler-fe7cc",
  storageBucket: "train-scheduler-fe7cc.appspot.com",
  messagingSenderId: "486320349933"
};
firebase.initializeApp(config);
var database = firebase.database();

var train = "";
var destination = "";
var firstTime = "";
var frequency = "";

/*
current state:
Able to connect and add single set of values to FB-DB 

Next steps:
understand and add functionality to ADD / append values

Create a function to find out NEXT ARRIVAL TIME

Create a function to countdown minutes to next arrival

*/

$("#submit").on("click", function (event) {
  event.preventDefault();
  train = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTime = $("#first-input").val().trim();
  frequency = $("#freq-input").val().trim();
  database.ref().set({

    // console.log("i ran ");

    train: train,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
    // dateAdded: firebase.database.ServerValue.TIMESTAMP

  });
  console.log("below: Train, Destination, firstTime and frequency ");
  console.log(train);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);
});

database.ref("/trains").on("value", function (snapshot) {

  // Print the local data to the console.
  console.log(snapshot.val());
  console.log("inside on value chg  ");


  // Change the HTML to reflect the local value in firebase.
  //   clickCounter = snapshot.val().clickCount;

  // Log the value of the clickCounter
  //   console.log(clickCounter);

  // Change the HTML to reflect the local value in firebase.
  //   $("#click-value").text(snapshot.val().clickCount);

  // Change the HTML Value using a variable (similar to the above)
  //   $("#click-value").text(clickCounter);

  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});



// Firebase watcher + initial loader HINT: .on("value")
// database.ref().on("value", function (snapshot) {

//   // Log everything that's coming out of snapshot
//   console.log(snapshot.val());
//   console.log(snapshot.val().train);
//   console.log(snapshot.val().destination);
//   console.log(snapshot.val().firstTime);
//   console.log(snapshot.val().frequency);

// //      // Handle the errors
//    }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);

// });

//   // Change the HTML to reflect
  // function(){
  //     <tr>
  //     <th scope="col">Employee Name</th>
  //     <th scope="col">Role</th>
  //     <th scope="col">Start Date</th>
  //     <th scope="col">Months Worked</th>
  //     <th scope="col">Monthly Rate ($)</th>
  //     <th scope="col">Total Billed ($)</th>
  // </tr>



// $("#name-display").text(snapshot.val().name);
// $("#email-display").text(snapshot.val().role);
// $("#age-display").text(snapshot.val().monthlyRate);
// $("#comment-display").text(snapshot.val().startDate);

//      // Handle the errors
//    }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// });