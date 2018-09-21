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

//Words array
var words = ["Westminster Abbey", "Kensington Gardens", "Tower Bridge", "Parliament", "Buckingham Palace", "Trafalgar Square"]
//Randomly select a word from the words array 
var word = words[Math.floor(Math.random()*words.length)];
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


var paragraph = $("<p>")
//Add class to p tags 
paragraph.addClass( ".decodeAlphabet" );

var p_encrypted = paragraph.text(encrypted)

var p_encryptalpha = paragraph.text(encryptalpha)

var p_decryptalpha = paragraph.text(decryptalpha)

//Append to HTML
$( ".inner" ).text(p_encrypted);
$( ".outer" ).text(p_encryptalpha);
$( ".outer" ).text(p_decryptalpha);



//Check the users input to the answer. If user is correct, hide this div and show the next div. 
$("#check").on("click", function() {
  event.preventDefault();

  var answer = $("#answer").val().trim();
  console.log(answer);

  answer = answer.toLowerCase();
  word = word.toLowerCase();

  console.log(answer);
  console.log(word);

  if (word === answer) {
    $("#containerScoreBoard").show().attr("class", "showScoreboard");
    // $("#containerScoreBoard").show();
    $("#decode-puzzle-container").hide();
  } else {alert("try again")}
  
})

