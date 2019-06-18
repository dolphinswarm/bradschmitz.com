// On document ready, prepare jQuery
$(document).ready(function(){
	
	// =============================== Toggle menu on hamburger click
	$("#bars").on("click", function(){
	
		// Get sidenav width
		var width = $("#sidenav").css("width");

		// If sidenav is 0, open; else, close
		if (width == "0px") {
			$("#sidenav").css("width", "50%");
		} else {
			$("#sidenav").css("width", "0px");
		}
		
		// Toggle animation for open / close
		$("#bars").toggleClass("is-active");
	})
	
	// =============================== On window resize...
	$(window).on("resize", function() {
		
		// If window is greater than 500px, collapse sidenav
		if ($(window).width() > 500) {
			$("#sidenav").css("width", "0px");
		}
	})

});