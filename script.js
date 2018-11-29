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


var dateAdded = "";


function sendDataToFireBase(data) {
  database.ref().push(data);
};

function handleSubmit(event) {
  event.preventDefault();
  //grabs user input
  var newEntry = {
      train: $("#train-input").val().trim(),
      destination: $("#destination-input").val().trim(),
      firstTime: $("#first-input").val().trim(),
      frequency: $("#freq-input").val().trim(),
      dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  sendDataToFireBase(newEntry);
};

// button for adding a schedule item 
$("#submit").on("click", handleSubmit);


function appendTableRow(rowData){
  var newRow = $("<tr>").append(
      $("<td>").text(rowData.chTrain),
      $("<td>").text(rowData.chDestination),

      $("<td>").text(rowData.chFrequency),
      //$("<td>").text(chFirstTime), //do not display first time 
      $("<td>").text(rowData.nextTrain),
      // $("<td>").text(nextTrainMins),
      $("<td>").text(rowData.tMinutesTillTrain),
      // $("<td>").text(minsUntil)

  )
  $("#train-table").append(newRow);
};

function convertTrainTimes(trainData) {
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainData.chFirstTime, "HH:mm").subtract(1, "years");
  //  console.log(firstTimeConverted);

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainData.chFrequency;
  //  console.log(tRemainder);

  // Minute Until Train // below adding a property to obj called 
  trainData.tMinutesTillTrain = trainData.chFrequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train// below adding a property to obj called trainData
  trainData.nextTrain = moment().add(trainData.tMinutesTillTrain, "minutes");
  //  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  //CODE FROM ^^^
  appendTableRow(trainData);

};

//creates Firebase event for adding train to the DB and a row in the HTML when a user adds entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  //store everything in a var

  var trainData = {
      chTrain: childSnapshot.val().train,
      chDestination: childSnapshot.val().destination,
      chFirstTime: childSnapshot.val().firstTime,
      chFrequency: childSnapshot.val().frequency,
  };
  // First Time (pushed back 1 year to make sure it comes before current time)
  convertTrainTimes(trainData);
});

