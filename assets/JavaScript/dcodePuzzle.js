//Decoder Puzzle
//Array of letter choices
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //Array containing all letters of the alphabet
//Array of words
var wordsArray = ["Underground", "Tower Bridge", "Buckingham Palace", "Parlament", "", "", "","", "", "", "", "", "", "", ""]; 

//Choose random word from the words array
function chooseWord () {
    var randomWord = wordArray[Math.floor(Math.random () * wordArray.length)];
    console.log(randomWord);
    spacesWord();
}

//Split up random word into letters into an array
// splits string of randomWord into an array consisting of each letter
function spacesWord () {
    splitUpWord = randomWord.split("");
    console.log(splitUpWord);
    for (var i = 0; i < splitUpWord.length; i++) {
        splitUpWord[i] = "_ ";
        displayWord += splitUpWord[i];
    }
    console.log(displayWord);
}

//Shuffle letters in the selected random word
var letters_temp = shuffleArray((letters.slice(0)))
//Loop through the length of the letters array
    for (var i = 0; i < letters.length; i++) {
        $("#count-letters").append($("<div>").addClass("count_letter_item")
        .append(letters[i])
        .append("<br>")
        .append ($("<input>").attr("name", "letters["+letters[i]+"]")
        .val(letters_temp[i])
        .attr("size", 2)
        ))
    }
//Randomize array element order in-place using durstenfeld shuffle algorithm
    function shuffleArray(array) {
        for (var i = array.length -1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = array [i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }
    
    $("[name=txt_input]").keyup(function(){
      console.log("log contents");
      var the_input = $("[name=txt_input]").val().split("")
      var translated_text = ""
      for (var i = 0; i < the_input.length; i++) {
        if($("[name='letters["+the_input[i]+"]']").val() === undefined){
          translated_text += the_input[i]
        }else{
          translated_text += $("[name='letters["+the_input[i]+"]']").val()
        }
        
      }
      $("[name=txt_output]").val(translated_text)
      // if($("[name='letters[m]']").val())
    })
  