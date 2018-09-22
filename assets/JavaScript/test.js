//capture users information they input
//possibly need to hide some stuff, just have the welcome page and when they click start, the current page hides and first puzzle load
//going to need the rest of pages hiding when first page loads, then when user clicks start, front 3rd and 4th pages hide and 2nd page shows
var number = 100;
$(document).ready(function() {
    $(".containerScoreBoard").hide();
    $("#decode-puzzle-container").hide();
    $("#hideMapRiddle").hide();
    $("#currency-puzzle-container").hide();
  
    //step one. capture users name
    $(".waves-effect").on("click", function() {
      event.preventDefault();
      var userName = $("#first_name2")
        .val()
        .trim();
      //step two. Hide the rest of the pages, then when user clicks submit, hide front page and show google maps puzzle
      $("#hideMapRiddle").show();
      $(".containerFrontPage").hide();
      $("#containerScoreBoard").hide();
    });
    var intervalId;
    // var number = 100;
    $(".waves-effect").on("click", run);
    function run() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }
  
    function decrement() {
      number--;
      $("#count").html("<p>" + "Seconds left: <span id='timer-value'>" + number + "</span></p>");
      // $("#count2").html("<h2>" + "Seconds left: " + number + "</h2>");
      // $("#count3").html("<h2>" + "Seconds left: " + number + "</h2>");
      if (number === 0 || word === answer) {
        stop();
        // alert("Time Up!");
      } 
    }
    function stop() {
      clearInterval(intervalId);
    }
  });
  
  $("#view_scoreboard").on("click", function() {
      event.preventDefault();
      $(".containerFrontPage").hide();
      $(".containerScoreBoard").show();
  })
  
///////////////////////////






//Build the cypher and its reverse
$("#done").hide()
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
//Words array
var words = ["Westminster Abbey", "Kensington Gardens", "Tower Bridge", "Parliament", "Buckingham Palace", "Trafalgar Square"]
//Randomly select a word from the words array 
var word = words[Math.floor(Math.random()*words.length)];

var answer ='';
console.log(word);
//Letters array 
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
//Empty array to store the scrambled letters
var lettersscrambled = "";
//For loop that loops through the letters array, scrambles the letters, 
//and places them into the scrambledletters var
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
  answer = answer.toLowerCase();
  word = word.toLowerCase();
  console.log("answer: " + answer);
  console.log(word);
  if (word === answer) {
    // $(".containerScoreBoard").show().attr("class", "showScoreboard");
    // // $("#containerScoreBoard").show();
    // $("#decode-puzzle-container").hide();
    // $("#directions-label").hide();
    $("#done").show()
    //stop timer
    var time = $("#timer-value").val().trim();
    // var time1 = $("#count").div.innerHTML
    console.log(time)
    // console.log(time1)
  } else {alert("try again")}

  $("#done").on("click", function() {
      $(".containerScoreBoard").show().attr("class", "showScoreboard");
    // $("#containerScoreBoard").show();
    $("#decode-puzzle-container").hide();
    $("#directions-label").hide();
  })
  
})



////////////////////////


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
                    // $("#output").append("<tr><td>" + playerName + "</td>")
                    
                }); 
                var intervalId;
            // var number = 45;
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
            //    return false;
               console.log("test")
            
              });
              database.ref().on("child_added", function(snapShot) {
              var playerName = snapShot.val().name;
              var playerScore = snapShot.val().score;
              $("#output").append("<tr><td>" + playerName + "</td><td>" + playerScore + "</td>")
            });

            // if (word === answer) {
            //     $("#output").append("<tr><td>" + playerName + "</td><td>" + number + "</td>")
            // }
    
    
    });