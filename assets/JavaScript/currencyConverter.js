//object with values for each country
var gameValues = {
    countries: [
        {
            country: "England",
            currency: "GBP",
            answer: 9.18,
            symbol: "£"
        }
    ]
}

//update page with currency for country
$("#country-to-convert").text(gameValues.countries[0].currency)

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

        //math to convert the users guess
        var convertGuess = guess * conversionRate

        //limit converted guess to two decimal points
        convertedGuess = convertGuess.toFixed(2)
        console.log(convertedGuess)

        //update page with vconverted guess
        $("#currency-converted-container").append(gameValues.countries[0].symbol + convertedGuess)
    })
})

//function to verify user solved puzzle correctly
$("#converted-math-puzzle-guess").on("click", function(){
    event.preventDefault();

    //variables to compare
    var answer = gameValues.countries[0].answer
    var convertedGuess = parseFloat($("#converted-number-input").val().trim())

    console.log(answer)
    console.log(convertedGuess)

    //setting modal values back to default
    $("#currency-modal-wrong").show()
    $("#currency-modal-try-again").show()
    $("#currency-modal-correct").show()
    $("#currency-modal-next").show()

    //logic to determine which version of the modal to show
    if (convertedGuess === answer) {
        $("#currency-modal-wrong").hide()
        $("#currency-modal-try-again").hide()
    } else {
        $("#currency-modal-correct").hide()
        $("#currency-modal-next").hide()
        $("#number-input").val("")
        $("#converted-number-input").val("")
        $("#currency-converted-container").empty()
    }

    //show modal
    $('.modal').modal();
      
})