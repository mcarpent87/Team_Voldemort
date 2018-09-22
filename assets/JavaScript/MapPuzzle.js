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

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 51.502604, lng: -0.12471 }
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("right-panel"));

  var control = document.getElementById("floating-panel");
  control.style.display = "block";
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  directionsService.route(
    {
      origin: start,
      destination: end,
      travelMode: "DRIVING"
    },
    function(response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

var startLocationArray = [
  {
    Location: "Big Ben",
    Hint:
      "I have four faces, yet cannot see I have eight hands but cannot touch I sit beside the seats of power, What am I?"
  }
];

var answerArray = [
  {
    Location: "Oxford",
    Hint: "One does not simply walk there.",
    Correct: "87"
  },

  {
    Location: "Stonehenge",
    Hint:
      "My creator is a mystery, One that's set in stone. My origins, my history, Still totally unknown.",
    Correct: "106"
  },

  {
    Location: "Bath",
    Hint: "A Roman and Georgian spa city known for its hot springs.",
    Correct: "137"
  },

  {
    Location: "Dover",
    Hint: "Known for white cliffs that can be seen from France.",
    Correct: "112"
  }
];

$("#startLocation").append(startLocationArray[0].Hint);

var targetNumberToGet =
  answerArray[Math.floor(Math.random() * answerArray.length)];
console.log(targetNumberToGet);
$("#endLocation").append(targetNumberToGet.Hint);

console.log(targetNumberToGet.Correct);
$("#mapAnswerSubmit").on("click", function() {
  event.preventDefault();

  var userInput = $("#mapAnswerInput")
    .val()
    .trim();

  if (userInput === targetNumberToGet.Correct) {
    $("#hideMapRiddle").hide();
    $(".testDiv").hide();
    $("#riddleText").hide();
    // $("#count").hide();
    $("#currency-puzzle-container").show();
  } else {
    $("#mapAnswerInput").val("");
    // $('#modal1').modal();
  }
});