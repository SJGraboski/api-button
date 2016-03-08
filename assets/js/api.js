/* 1: Global Vars
 * ============== */

// Array for default buttons
var buttons = ["Hitchock", "Trufaut"];

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
										.attr("data-name", this.buttons[i]);
			$('#button-box').prepend(theButton);
		}
	},

	// call api on pressing new buttons
	powerButton : function(sel) {

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
									apiSearch + 
									"&api_key=dc6zaTOxFJmzC&limit=1"
	}


}

/* 3: Calls
 * ======== */

$(document).ready(function() {
	btnizer.addButton();
	console.log(btnizer.buttons);
});

$(document).on("click", "#add-it", function() {
	btnizer.addButton();
	// prevent page from refreshing
	return false;
});
