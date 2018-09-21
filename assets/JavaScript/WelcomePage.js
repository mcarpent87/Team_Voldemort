//capture users information they input
//possibly need to hide some stuff, just have the welcome page and when they click start, the current page hides and first puzzle load
//going to need the rest of pages hiding when first page loads, then when user clicks start, front 3rd and 4th pages hide and 2nd page shows

$(document).ready(function() {
  $(".containerScoreBoard").hide();
  $(".container").hide();
  $("#hideMapRiddle").hide();
  $("#currency-puzzle-container").hide();

  // $("#show").hide();   example, we can hide rest of page with this before the click function
  //step one. capture users name
  $(".waves-effect").on("click", function() {
    event.preventDefault();
    var userName = $("#first_name2")
      .val()
      .trim();
    alert(userName);
    //step two. Hide the rest of the pages, then when user clicks submit, hide front page and show google maps puzzle
    $("#hideMapRiddle").show();
    $(".containerFrontPage").hide();
    $(".containerScoreBoard").hide();
    $(".container").hide();
    //we can add more id's or classes as need to hide/show them
    //then lastly (i think) initialize the clock
  });
  var intervalId;
  var number = 100;
  $(".waves-effect").on("click", run);
  function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  function decrement() {
    number--;
    $("#count").html("<h2>" + "Seconds left: " + number + "</h2>");
    $("#count2").html("<h2>" + "Seconds left: " + number + "</h2>");
    $("#count3").html("<h2>" + "Seconds left: " + number + "</h2>");
    if (number === 0) {
      stop();
      alert("Time Up!");
    }
  }
  function stop() {
    clearInterval(intervalId);
  }
});
