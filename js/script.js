// On document ready, prepare jQuery
$(document).ready(function(){

	// =============================== GLOBAL VARIABLES
	var previousTab;
	var currentTab;

	// =============================== Toggle menu on hamburger click
	$("#bars").on("click", function(){
		// Toggle animation for open / close
		$("#bars").toggleClass("is-active");
		$("#sidenav").toggleClass("side-open");
	})

	// =============================== On window resize...
	$(window).on("resize", function() {

		// If window is greater than 500px, collapse sidenav
		if ($(window).width() > 500 - 18) {
			if ($("#bars").hasClass("is-active")) {
				$("#bars").removeClass("is-active");
			}
			if ($("#sidenav").hasClass("side-open")) {
				$("#sidenav").removeClass("side-open");
			}

		}

		// If window is less than or equal to 500px, collapse menus - UNNECESSARY FUNCITONALITY PROBABLY, WANT PEOPLE TO BE ABLE TO "SAVE" THEIR TABS
		// if ($(window).width() <= 500) {
		// 	if ($(".headergroup img").eq(currentTab).hasClass("rotate-img")){
		// 		$(".headergroup img").eq(currentTab).toggleClass("rotate-img");
		// 		$(".headergroup i").eq(currentTab).toggleClass("rotate-arrow");
		// 	}
		// 	$(".headergroup").eq(currentTab).find(".submenutab").css({"height": "0px", "outline": "0px solid #D1D1D1"});
		// }
	})

	// =============================== Main tab open / close on click (MAY NEED OPTIMIZATION?)
	$(".headergroup").on("click", function() {

		// Get previous and current tabs
		previousTab = currentTab;
		currentTab = $(this).index();

		// Toggle the rotate class for this element
		$(".headergroup img").eq(currentTab).toggleClass("rotate-img");
		$(".headergroup i").eq(currentTab).toggleClass("rotate-arrow");
		$(".headergroup").eq(currentTab).find(".submenutab").css({"height": "60px", "outline": "1px solid #D1D1D1"});

		// If different than current tab...
		if (previousTab !== currentTab) {

			// ... and if previous tab is rotated, then un-rotate it
			if ($(".headergroup img").eq(previousTab).hasClass("rotate-img")) {
				$(".headergroup img").eq(previousTab).toggleClass("rotate-img");
				$(".headergroup i").eq(previousTab).toggleClass("rotate-arrow");
				$(".headergroup").eq(previousTab).find(".submenutab").css({"height": "0px", "outline": "0px solid #D1D1D1"});

			}

		// Else, it's the same tab, so...
		} else {

			// ...if rotated, un-rotate it
			if (!$(".headergroup img").eq(previousTab).hasClass("rotate-img")) {
				$(".headergroup").eq(currentTab).find(".submenutab").css({"height": "0px", "outline": "0px solid #D1D1D1"});
			}
		}

		// Alert for troubleshooting
		// alert("PreviousTab: " + previousTab + ", CurrentTab: " + currentTab);

	})

	// =============================== Side tab open / close on click (MAY NEED OPTIMIZATION?)
	$(".sidenavgroup").on("click", function() {

		// Get previous and current tabs
		previousTab = currentTab;
		currentTab = $(this).index();

		// Toggle the rotate class for this element
		$(".sidenavgroup img").eq(currentTab).toggleClass("rotate-img");
		$(".sidenavgroup i").eq(currentTab).toggleClass("rotate-arrow");
		$(".sidenavgroup").eq(currentTab).find(".submenutab").css({"height": "60px", "outline": "1px solid #D1D1D1"});

		// If different than current tab...
		if (previousTab !== currentTab) {

			// ... and if previous tab is rotated, then un-rotate it
			if ($(".sidenavgroup img").eq(previousTab).hasClass("rotate-img")) {
				$(".sidenavgroup img").eq(previousTab).toggleClass("rotate-img");
				$(".sidenavgroup i").eq(previousTab).toggleClass("rotate-arrow");
				$(".sidenavgroup").eq(previousTab).find(".submenutab").css({"height": "0px", "outline": "0px solid #D1D1D1"});

			}

		// Else, it's the same tab, so...
		} else {

			// ...if rotated, un-rotate it
			if (!$(".sidenavgroup img").eq(previousTab).hasClass("rotate-img")) {
				$(".sidenavgroup").eq(currentTab).find(".submenutab").css({"height": "0px", "outline": "0px solid #D1D1D1"});
			}
		}

		// Alert for troubleshooting
		// alert("PreviousTab: " + previousTab + ", CurrentTab: " + currentTab);

	})

	// =============================== Autopause audio / video if another starts playing
	$("audio").on("play", function() {
	    $("audio").not(this).each(function(index, audio) {
	        audio.pause();
	    });
	});

	$("video").on("play", function() {
	    $("video").not(this).each(function(index, video) {
	        video.pause();
	    });
	});

	// =============================== Score view button handling
	$(".viewbutton").on("click", function() {
		if ($(this).text() == "View Score") {
			$(this).text("Close Score");
		} else {
			$(this).text("View Score");
		}

		if ($("#landwardhoviewbutton")) {
			$("#landwardhoview").toggleClass("hide");
		}

		if ($("#devoidviewbutton")) {
			$("#devoidview").toggleClass("hide");
		}
	});

	// =============================== handle form submission
	// $("#contactform").on("submit", function(event) {
	// 	event.preventDefault();
	// 
	// 	var formData = {};
	// 	formData.email = $("#email").val();
	// 	formData.fname = $("#fname").val();
	// 	formData.lname = $("#lname").val();
	// 	formData.subject = $("#subject").val();
	// 	formData.content = $("#content").val();
	//
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "php/mail.php",
	// 		contentType: "application/json",
	// 		data: JSON.stringify(formData)
	// 	});
	// 	alert("MEOW");
	// });
});
