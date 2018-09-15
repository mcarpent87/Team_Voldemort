$( document ).ready(function() {
//Capture username and dynamically put in scoreboard
//Capture time and dynmically put it in scoreboard, eventually need to make it post on scoreboard with best time first
$(".waves-effect").on("click", function () {
    event.preventDefault();
    $(".waves-effect").on("click", function () {
        event.preventDefault();
        var playerName = $("#first_name2").val().trim();
        $("#output").append("<tr><td>" + playerName + "</td>")
        //i added a ID to the tobdy    <tbody id="output"><tbody>   left it empty and just dynmically generated the names
        //now i have to generate the time but dont have a timer yet
        //We will have to change this to go on the last puzzle game, so when they click complete or what ever we decide,
        //to display this in the scoreboard section
    }); 
});


// this is a tmer i made, we can use it or delete it
//$('#timer').click(function(){
    //var counter = 45;
   // setInterval(function() {
     // counter--;
     // if (counter >= 0) {
     // span = $("#count").text("Time Left " + counter +" seconds");
   // }
  //  
  //}, 1000);  
//});
//if we had a done button or time runs out, this will display to the scoreboard



$('#done').click(function(){
    //made a counter that is part of my clock i made
    //if they finish early, they click #done   button and it shows their name and score, im currently working on capturing current score
    counter = 45;
    var playerName = $("#first_name2").val().trim();
    var playerScore = counter;
   $("#output").append("<tr><td>" + playerName + "</td><td>" + playerScore + "</td>")
  });

  
});