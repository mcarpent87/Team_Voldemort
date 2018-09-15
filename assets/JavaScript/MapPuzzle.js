function initMap() {
  var markerArray = [];

  // Instantiate a directions service.
  var directionsService = new google.maps.DirectionsService();

  // Create a map and center it on Manhattan.
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 51.502604, lng: -0.12471 }
  });

  // Create a renderer for directions and bind it to the map.
  var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow();

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(
    directionsDisplay,
    directionsService,
    markerArray,
    stepDisplay,
    map
  );
  // Listen to change events from the start and end lists.
  var onChangeHandler = function() {
    calculateAndDisplayRoute(
      directionsDisplay,
      directionsService,
      markerArray,
      stepDisplay,
      map
    );
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(
  directionsDisplay,
  directionsService,
  markerArray,
  stepDisplay,
  map
) {
  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService.route(
    {
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      travelMode: "DRIVING"
    },
    function(response, status) {
      // Route the directions and pass the response to a function to create
      // markers for each step.
      if (status === "OK") {
        document.getElementById("warnings-panel").innerHTML =
          "<b>" + response.routes[0].warnings + "</b>";
        directionsDisplay.setDirections(response);
        showSteps(response, markerArray, stepDisplay, map);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = (markerArray[i] = markerArray[i] || new google.maps.Marker());
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
      stepDisplay,
      marker,
      myRoute.steps[i].instructions,
      map
    );
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, "click", function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

var answerArray = [
  {
    Location: "Oxford",
    Hint: "One does not simply walk there.",
    Correct: "Test"
  },
  {
    Location: "Stonehenge",
    Hint:
      "My creator is a mystery,One that's set in stone. My origins, my history, Still totally unknown.",
    Correct: "Test1"
  },
  {
    Location: "Stonehenge",
    Hint:
      "My creator is a mystery,One that's set in stone. My origins, my history, Still totally unknown.",
    Correct: "Test2"
  },
  {
    Location: "Stonehenge",
    Hint:
      "My creator is a mystery,One that's set in stone. My origins, my history, Still totally unknown.",
    Correct: "Test3"
  },
  {
    Location: "Stonehenge",
    Hint:
      "My creator is a mystery,One that's set in stone. My origins, my history, Still totally unknown.",
    Correct: "Test4"
  }
];

var targetNumberToGet =
  answerArray[Math.floor(Math.random() * answerArray.length)];
console.log(targetNumberToGet);
$("#startLocation").append(targetNumberToGet.Hint);

console.log(answerArray[0].Location);
$("#mapAnswerSubmit").on("click", function() {
  event.preventDefault();
  var userInput = $("#mapAnswerInput")
    .val()
    .trim();
  if (userInput === answerArray[0]) {
    $("#mapRiddle").hide();
  } else {
    alert("Try Again");
    $("#mapAnswerInput").val("");
  }
});
