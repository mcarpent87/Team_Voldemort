
// global variables
var number = 300;
var intervalId;
var word = "";
var answer = "";
var userName = "";

// Welcome Page JS

// hiding puzzle divs and scoreboard on page load
$(document).ready(function() {
    $("#containerScoreBoard").hide();
    $("#decode-puzzle-container").hide();
    $("#hideMapRiddle").hide();
    $("#currency-puzzle-container").hide();
  
    // function when start button is clicked on
    $(".waves-effect").on("click", function() {
        event.preventDefault();
        
        // store userName
        userName = $("#first_name2").val().trim();
        console.log(userName);

        //hide the start page and show the map puzzle page
        $("#hideMapRiddle").show();
        $(".containerFrontPage").hide();
        $("#count").show();
        });

    // game timer function
    $(".waves-effect").on("click", run);

    function run() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }
  
    function decrement() {
        number--;

        //add timer to html
        $("#count").html("<p>" + "Seconds left: <span id='timer-value'>" + number + "</span></p>");

        //conditions to stop timer. either when time runs out or game is completed
        if (number === 0 || word === answer) {
            stop();
        } 

        if (number === 0) {
            //need to add modal to alert that time is up and restart game
            location.reload()
        } 
    }

    // stop function for timer
    function stop() {
        clearInterval(intervalId);
    }
});
  
// show scoreboard when view scoreboard button is clicked on Welcome Page
  $("#view_scoreboard").on("click", function() {
      event.preventDefault();
      $(".containerFrontPage").hide();
      $("#containerScoreBoard").show();
  })
  
/////////////////////////// end of Welcome Page 


// Decode Puzzle JS

// hidding done button
$("#done").hide()

//Build the cypher and its reverse
let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''),
    cypher = {},
    reverseCypher = {};

alphabet.forEach(ea => cypher[ea] = '');
    for (let i in cypher) {
      cypher[i] = alphabet.splice(Math.floor(Math.random() * alphabet.length), 1)[0];
    }
    for (let i in cypher) {
      reverseCypher[cypher[i]] = i;
    }

//Build the encryption and decryption functions
function encrypt(string) {
    string = string.toLowerCase().split('');

    string.forEach((ea, i) => {
        if (cypher[ea]) {
            string[i] = cypher[ea];
        }
    });

    return string.join('');
}

function decrypt(encrypted) {
    encrypted = encrypted.toLowerCase().split('');

    encrypted.forEach((ea, i) => {
        if (reverseCypher[ea]) {
            encrypted[i] = reverseCypher[ea];
        }
    });

    return encrypted.join('')
}

//array of possible words
var words = ["Westminster Abbey", "Kensington Gardens", "Tower Bridge", "Parliament", "Buckingham Palace", "Trafalgar Square"]

//Randomly select a word from the words array and store it in the global word variable
word = words[Math.floor(Math.random()*words.length)];

console.log(word);

//Letters array 
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

//Empty array to store the scrambled letters
var lettersscrambled = "";

//For loop that loops through the letters array, scrambles the letters, and places them into the scrambledletters var
for (var i=0; i < letters.length; i++) {
    letters[Math.floor(Math.random()*letters.length)];
    lettersscrambled += letters[i];
}

// Split randomly selected word into array of letters
var wordSplit = word.split('');

//Grab a random word from the words array and encrypt it. 
var encrypted = encrypt(word);
console.log(encrypted);

var encryptalpha = encrypt(lettersscrambled);
console.log(encryptalpha);

var decryptalpha = decrypt(encryptalpha); 

var html = "<h4>Secret Message</h4>"+"<h6>" + encrypted + "</h6>" + "<h4>Decipher Message Here</h4>" + "<h6>" + encryptalpha + "</h6>" + "<h6>" + decryptalpha + "</h6>";

//place html into the game ID
document.querySelector('#word').innerHTML = html;

//Check the users input to the answer. If user is correct, hide this div and show the next div. 
$("#check").on("click", function() {
    event.preventDefault();

    answer = $("#answer").val().trim();
    console.log(answer);

    // make word and answer variables all lower case so they'll compare correctly
    answer = answer.toLowerCase();
    word = word.toLowerCase();

    console.log("answer: " + answer);
    console.log(word);

    // conditions for winning are in scoreboard section - see on click event for #check, line 187

})

//////////////////////// end of decoder puzzle code



// Scoreboard JS
$( document ).ready(function() {

    // initialize firebase
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
        
    // push username and score to firebase and then pull from firebase into the scoreboard
    $("#check").on("click", function() {
        if (word === answer) {
            // set player score equal to the amount of time left
            var playerScore = number;

            // add user ingo to firebase
            database.ref().push({
                name: userName,
                score: playerScore
            });
            // hide decode game and timer and show scoreboard
            $("#containerScoreBoard").show().attr("class", "showScoreboard");
            $("#play_again").show();
            $("#decode-puzzle-container").hide();
            $("#directions-label").hide();
            $("#count").hide()
        } else {
            // empty out previous answer if incorrect
            $("#answer").val("")
        }
    })

    // update page with information from firebase when new information is added
    database.ref().on("child_added", function(snapShot) {
        var playerName_display = snapShot.val().name;
        var playerScore_display = snapShot.val().score;

        // update HTML
        $("#output").append("<tr><td>" + playerName_display + "</td><td>" + playerScore_display + "</td>")
    });

    // restart game when play again button is clicked.
    $("#play_again").on("click", function() {
        location.reload()
    })

});