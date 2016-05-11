
var tvShows = ['Mash','The A-Team', 'Seinfeld', 'Game of Thrones', 'Walking Dead', 'Supernatural', 'Battlestar Galactica', 
				'star trek', 'Smallville', 'The Simpsons'];
  
$(document).ready(function() {

	$('#buttons').on('click', "button", function() {
		var searchTerm =  $(this).data('name');
		var APIKey = "dc6zaTOxFJmzC";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchTerm+"&api_key="+APIKey+"&limit=10";
		
		$.ajax({
		    url: queryURL,
		    method: 'GET'
		})
		.done(function(response) {
		
			// Deletes the TV Shows prior to adding new movies.
			// This is necessary otherwise you will have repeat buttons.
			 $('#addPics').empty();

			// Loop through the images and create the img tags
			for (var i = 0; i < response.data.length; i++) {

				// ***  Create the DIV for each image ***
				var div = $('<div>');
				div.addClass('divPic');
				div.attr('id', i);
				$('#addPics').append(div);	

				// *** Create the images ****
				var pics = $('<img>');
				// Add the class pics
				pics.addClass('pics');

				// Add the src attribute
				pics.attr('src', response.data[i].images.original_still.url);
				
				// Add the data-animate attribute
				pics.attr('data-animate',  response.data[i].images.original.url);
				
				// Add the data-still attribute
				pics.attr('data-still', response.data[i].images.original_still.url);
				
				// Add the data-state attribute
				pics.attr('data-state', "still");

				// Append the img to the addPics DIV
	       		$('#'+i).append(pics);

	       		// *** Create the ratings paragraph ***
				var ratings = $('<p>');
				ratings.html("Rating: "+response.data[i].rating);
				$('#'+i).prepend(ratings);
			}
	  
		});
	});


	// This function handles events where the "Add TV Show" button is clicked
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

	$('#addPics').on('click', "img", function(event){
		event.preventDefault();
	 	var state = $(this).attr('data-state');

	    if (state == "still") {
	        $(this).attr('src', $(this).data('animate'));
	        $(this).attr('data-state', 'animate');
	    } else {
	        $(this).attr('src', $(this).data('still'));
	        $(this).attr('data-state', 'still');
	    }

	});

 });

// Function for rendering the tvShow buttons
function renderButtons(){ 

    // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
    $('#buttons').empty();

    // Loops through the array of movies
    for (var i = 0; i < tvShows.length; i++){

      // Then dynamicaly generates buttons for each movie in the array

      // Note the jQUery syntax here... 
        var a = $('<button>');
        a.addClass('myButtons'); 
        a.attr('data-name', tvShows[i]);
        a.text(tvShows[i]);
        $('#buttons').append(a);
    }
}



// Create Buttons
renderButtons();


