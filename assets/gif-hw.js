// GifTastic by Johnny Maravelis


// My Giphy API Key T95EMN7QkzMEAL2jLFmKEl6HO1C4dDtq




// DECLARING SECTION START ------------


// VARIABLES
let topics = [
	"captain jean luc picard", "commander data", "worf", "geordi la forge", "beverly crusher", "deanna troi", "guinan"
];

// List of Gif results that weren't working for "topics" array:
// "commander william t. ryker",



// FOR LOOP FOR BUTTONS
for(var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("data-trek", topics[i]);
	button.addClass("trek-button");
	$("#button-group").append(button);
}

// CONDITIONALS / LOGIC
$("#add-trek-button").on("click", function(e) {
	e.preventDefault();
    var alreadyExist = false;
    // Note: to delete user submission if character / button already is in the array (lines 30-31).
	if(topics.indexOf($("#new-trek-input").val()) !== -1) {
		alreadyExist = true;
	}
	if($("#new-trek-input").val() !== "" && alreadyExist === false) {
		var newtrek = $("#new-trek-input").val().toLowerCase();
		topics.push(newtrek);
		var button = $("<button>").text(newtrek);
		button.attr("data-trek", newtrek);
		button.addClass("trek-button");
		$("#button-group").append(button);
	}
	$("#new-trek-input").val("");
});

// API START
$(document).on("click", ".trek-button", function() {
	var trek = $(this).attr("data-trek");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        trek + "&api_key=T95EMN7QkzMEAL2jLFmKEl6HO1C4dDtq&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;
    	// console.log(results);

        // CALLBACK / DOM MANIPULATION START
		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var trekImg = $("<img class='result'>");
    		trekImg.attr("src", results[i].images.fixed_height_still.url);
    		trekImg.attr("data-state", "still");
    		trekImg.attr("data-still", results[i].images.fixed_height_still.url);
    		trekImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(trekImg);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#treks-group").prepend(resultsContainerSection);
    });
});

// API END

// CALLBACK / DOM MANIPULATION END
$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


