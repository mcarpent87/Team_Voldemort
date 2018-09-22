//object with values for each country
var gameValues = {
    countries: [
        {
            country: "England",
            currency: "GBP",
            symbol: "£"
        }
    ]
}

//object with different puzzles in it
var puzzleImage = {
    puzzles: [
        {
            img: "./assets/images/cups.png",
            answer: 100
        }, {
            img: "./assets/images/flowers.png",
            answer: 101
        }, {
            img: "./assets/images/fruit.png",
            answer: 12
        }, {
            img: "./assets/images/horses.png",
            answer: 21
        }
    ]
}

//pick a random number to determine which puzzle will show
var randomNumber = Math.floor((Math.random() * 4))

console.log(randomNumber)

//put image on page
var image = $("<img>").attr("src", puzzleImage.puzzles[randomNumber].img);

image.addClass("currency-puzzle-image")

$("#math-puzzle-image").append(image)

//update page with currency for country
$("#currency-to-convert").text(gameValues.countries[0].currency)
$("#country-to-convert").text(gameValues.countries[0].country)

//global converted answer
var convertedAnswer = 0

//currency conversion click event
$("#math-puzzle-guess").on("click", function(){
    event.preventDefault();

    //empty out the converted container of any old values
    $("#currency-converted-container").empty()

    //variables
    var convertedGuess = 0
    var guess = $("#number-input").val().trim()
        console.log(guess)
    var toType = gameValues.countries[0].currency
        console.log(toType)
    var fromType = "USD"
        console.log(fromType)
    var queryURL = "https://currency-exchange.p.mashape.com/exchange?from=" + fromType + "&to=" + toType
    
    //ajax call to API
    $.ajax({
        method: "GET",
        url: queryURL,
        headers:{
            "X-Mashape-Key": "bQjj1jZnuamshc0BUp5jUrxNSbQWp1Boy0wjsnnWvMuqgbno7p",
            "Accept": "application/json"
        }
    }).then(function(awesomeData) {
        
        //variable to hold conversion rate
        var conversionRate = awesomeData
        console.log(conversionRate)

        //math to convert the users guess and puzzle answer
        var convertGuess = guess * conversionRate

        var convertAnswer = puzzleImage.puzzles[randomNumber].answer * conversionRate

        //limit converted guess and answer to two decimal points
        convertedGuess = convertGuess.toFixed(2)
        convertedAnswer = convertAnswer.toFixed(2)
        console.log(convertedGuess)

        //update page with vconverted guess
        $("#currency-converted-container").append(gameValues.countries[0].symbol + convertedGuess)
    })
})

//function to verify user solved puzzle correctly
$("#converted-math-puzzle-guess").on("click", function(){
    event.preventDefault();

    //variables to compare
    var answer = parseFloat(convertedAnswer)
    var convertedGuess = parseFloat($("#converted-number-input").val().trim())

    console.log(answer)
    console.log(convertedGuess)

    //logic to move to next page if correct or reset input fields if wrong
    if (convertedGuess === answer) {
        $("#currency-puzzle-container").hide()
        $("#decode-puzzle-container").show()
    } else {
        $("#number-input").val("")
        $("#converted-number-input").val("")
        $("#currency-converted-container").empty()
        // $('.modal').modal();
    }      
})