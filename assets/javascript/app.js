
var tvShows = ['Mash','The A-Team', 'Seinfeld', 'Game of Thrones', 'Walking Dead', 'Supernatural', 'Battlestar Galactica', 
				'star trek', 'Smallville', 'The Simpsons'];


 	// Generic function for displaying movie data 
	function renderButtons(){ 

	    // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
	    $('#buttons').empty();

	    // Loops through the array of movies
	    for (var i = 0; i < tvShows.length; i++){

	      // Then dynamicaly generates buttons for each movie in the array

	      // Note the jQUery syntax here... 
	        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	        a.addClass('myButtons'); // Added a class 
	        a.attr('data-name', tvShows[i]); // Added a data-attribute
	        a.text(tvShows[i]); // Provided the initial button text
	        $('#buttons').append(a); // Added the button to the HTML
	    }
	}

	// This function handles events where one button is clicked
	$('#addMovie').on('click', function(){

		// This line of code will grab the input from the textbox
		var tvShow = $('#movie-input').val().trim();

		if (tvShow === "" && typeof tvShow === "string") {

			$("#errorMessage").show();
			$("#errorMessage").html("You need to enter a TV show!");
			
		} else {

			$("#errorMessage").hide();

			// The movie from the textbox is then added to our array
			tvShows.push(tvShow);

			// Our array then runs which handles the processing of our movie array
			renderButtons();
		}

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	// Create Buttons
	renderButtons();