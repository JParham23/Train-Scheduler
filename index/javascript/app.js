// Initialize Firebase
var config = {
  apiKey: "AIzaSyAIovLAfEVW6ITQO4KCsE8qK-LEqtCtNWw",
  authDomain: "trainhomework-234f5.firebaseapp.com",
  databaseURL: "https://trainhomework-234f5.firebaseio.com",
  projectId: "trainhomework-234f5",
  storageBucket: "trainhomework-234f5.appspot.com",
  messagingSenderId: "257209335024"
};
firebase.initializeApp(config);

  
  // Reference to database
  var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs values from input form
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-input").val().trim(), "hh:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database (ie. Code for the push)
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // Log Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

// Time considerations (the Math!) 
//-----------------------------------------

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
console.log(firstTrainConverted);

// Current Time and call moment library
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between current time and the first train
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
console.log(nextTrain);

  // Add train data to the table
  $("#train-table > tbody").append(
    "<tr><td>" + trainName + 
    "</td><td>" + destination + 
    "</td><td>" + frequency + 
    "</td><td>" + nextTrain + 
    "</td><td>" + tMinutesTillTrain + "</td></tr>");
});