$( document ).ready(function() {
//Capture username and dynamically put in scoreboard
//Capture time and dynmically put it in scoreboard, eventually need to make it post on scoreboard with best time first

        //i added a ID to the tobdy    <tbody id="output"><tbody>   left it empty and just dynmically generated the names
        //now i have to generate the time but dont have a timer yet
        //We will have to change this to go on the last puzzle game, so when they click complete or what ever we decide,
        //to display this in the scoreboard section
        var config = {
            apiKey: "AIzaSyA4r3MHnMJkHdEibPa2Hkjq__GBdUml1HY",
            authDomain: "groupprojectyo-a3325.firebaseapp.com",
            databaseURL: "https://groupprojectyo-a3325.firebaseio.com",
            projectId: "groupprojectyo-a3325",
            storageBucket: "groupprojectyo-a3325.appspot.com",
            messagingSenderId: "989934469776"
          };
          firebase.initializeApp(config);
          var database = firebase.database();
        
        $(".waves-effect").on("click", function () {
            event.preventDefault();
                event.preventDefault();
                var playerName = $("#first_name2").val().trim();
                $("#output").append("<tr><td>" + playerName + "</td>")
                
            }); 
            var intervalId;
        var number = 45;
        $("#done").on("click", stop);
        
        $("#timer").on("click", run);
        function run() {
          clearInterval(intervalId);
          intervalId = setInterval(decrement, 1000);
        }
        
        function decrement() {
          number--;
          $("#count").html("<h2>" + number + "</h2>");
          if (number === 0) {
            stop();
            alert("Time Up!");
          }
        }
        function stop() {
          clearInterval(intervalId);
        }
        $('#done').click(function(){
            var playerName = $("#first_name2").val().trim();
            var playerScore = number;
            var userInfo = {
              name: playerName,
              score: playerScore
            }
            database.ref().push(userInfo);
            $("#first_name2").val("");
            $("#count").val("");
           return false;
          });
          database.ref().on("child_added", function(snapShot) {
          var playerName = snapShot.val().name;
          var playerScore = snapShot.val().score;
          $("#output").append("<tr><td>" + playerName + "</td><td>" + playerScore + "</td>")
        });


});