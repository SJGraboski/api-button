/* 1: Global Vars
 * ============== */

// Array for default buttons
var buttons = ["Tabby Cat", "Black Cat", "Persian Cat", "Maine Coon",
							 "Siamese Cat", "Oriental Cat", "Sphinx Cat", "Bengal Cat", "Kittens!"];

/* 2: Functions / Objects
 * ====================== */

// button interface object
var btnizer = {

	/* properties
	 * ========== */
	buttons : buttons,

	/* methods
	 * ======= */

	// spawn buttons
	addButton : function() {

		// only fire steps 1-3 if there's something in the input
		if ( $('#btn-input').val().trim() ) {
			// step one: clear the current buttons on the page
			$('#button-box').empty();

			// step two: catch input
			var apiSearch = $('#btn-input').val().trim();

			// step three: push to array
			this.buttons.push(apiSearch);
		}

		// step four: spawn the buttons
		for (var i = 0; i < this.buttons.length; i++){
			var theButton = $('<button>').text(this.buttons[i])
											.attr("data-name", this.buttons[i])
											.addClass("gif-button")
											.addClass("btn")
											.addClass("btn-info")
											.addClass("btn-sm");
			$('#button-box').append(theButton);
		}
	},

	// call api on pressing new buttons
	powerButton : function(sel) {

		// empty the gif-zone
		$('#gif-zone').empty();

		// catch search key
		var apiSearch = sel.data("name");

		// make query url with search key
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
									apiSearch + 
									"&api_key=dc6zaTOxFJmzC&limit=10";

		// make the api call
		$.ajax({url: queryURL, method: "GET"})
		.done(function(response){
			
			// make a shorthand for response
			var pool = response.data;

			// run through the pool array, which will have a max length of 10
			for (var i = 0; i < pool.length; i++) {

				/* 1: Catch the info
				 * ================= */

				// catch the still image url
				var still = pool[i].images.fixed_height_still.url;

				// catch the animated image url
				var animated = pool[i].images.fixed_height.url;

				// display rating
				var rating = pool[i].rating;
				if (!rating) {
					rating = "none";
				}

				/* 2: Format the info
				 * ================= */

				// construct the div
				var gifBox = $('<div>').addClass("gif-box");

				var gifImg = $('<img>').addClass("giffy")
											.addClass("img-responsive")
											.attr('src', still)
											.attr("data-still", still)
											.attr("data-animated", animated)
											.attr("data-state", "still");

				var gifRating = $('<p>').addClass('gif-rating')
												.text("Rating: " + rating);

				gifBox.append(gifImg, gifRating);

				/* 3: Display the info
				 * =================== */
				$('#gif-zone').prepend(gifBox);
			}
		})
	},

	// change image from still to animated state, and vice versa
	picSwitcher : function(sel) {
		// grab data of this
		var state = sel.attr("data-state");

		// if still, make animated
		if (state === "still") {
			console.log("gif animated");
			var animateUrl = sel.data("animated");
			sel.attr('src', animateUrl);
			sel.attr("data-state", "animated");
		}
		// if animated, make still
		else if (state === "animated") {
			console.log("gif frozen")
			var stillUrl = sel.data("still");
			sel.attr('src', stillUrl);
			sel.attr("data-state", "still");
		}
	}
}

/* 3: Calls
 * ======== */

$("#side").ready(function() {
	btnizer.addButton();
});

$("form").on("click", "#add-it", function() {
	btnizer.addButton();
	// prevent page from refreshing
	return false;
});

$("#gif-zone").on("click", ".giffy", function() {
	btnizer.picSwitcher( $(this) );
});

$("#button-box").on("click", ".gif-button", function() {
	btnizer.powerButton( $(this) );
});


