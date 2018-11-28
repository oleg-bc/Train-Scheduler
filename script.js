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
var dateAdded = "";


// button for adding a schedule item 
$("#submit").on("click", function (event) {
  event.preventDefault();
  //grabs user input
  train = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTime = $("#first-input").val().trim();
  frequency = $("#freq-input").val().trim();

  var newEntry = {
    train: train,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  database.ref().push(newEntry);

  console.log("below: Train, Destination, firstTime, frequency, timestamp ");
  console.log("train "+train);
  console.log("destination "+destination);
  console.log("firstTime "+firstTime);
  console.log("frequency "+frequency);
  console.log("added at timestamp "+newEntry.dateAdded);
  //console.log(newEntry.dateAdded.val());
});

//creates Firebase event for adding train to the DB and a row in the HTML when a user adds entry
database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());

  //store everything int a var
  var chTrain = childSnapshot.val().train;
  var chDestination = childSnapshot.val().destination;
  var chFirstTime = childSnapshot.val().firstTime; 
  var chFrequency = childSnapshot.val().frequency;
  console.log("from the .on child_added event");
  console.log(chTrain);
  console.log(chDestination);
  console.log(chFirstTime);
  console.log(chFrequency);

  //var chTrainStartPretty = moment.unix(chFirstTime).format("MM/DD/YYYY");
  // LINES 75-80
  // VAR NEXT ARRIVAL
  // VAR MINUTES AWAY
//set time back 1 yr
var trainStartConverted = moment(chFirstTime, "hh:mm").subtract(1,"years");

//difference between current time train start time
var diffTime = moment().diff(moment(trainStartConverted),"minutes")

//time interval duration
var intervalDur = diffTime % frequency;
//next train in THIS many mins
var minsUntil= chFrequency-intervalDur;

var nextTrainMins= moment().add(minsUntil,"m").format("LT");

var newRow = $("<tr>").append(
  $("<td>").text(chTrain),
  $("<td>").text(chDestination), 
  $("<td>").text(chFirstTime),
  $("<td>").text(chFrequency),
  $("<td>").text(nextTrainMins),
  $("<td>").text(minsUntil)

)
$("#employee-table").append(newRow);
});

