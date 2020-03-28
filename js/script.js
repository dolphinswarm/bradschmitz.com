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

	// =============================== Score view button handling - MADE REDUNDANT BY COLLAPSIBLES
//	$(".viewbutton").on("click", function() {
//		// Landward Ho! button
//		if ($(this).is("#landwardhoviewbutton")) {
//			$("#landwardhoview").toggleClass("hide");
//			if ($("#landwardhoviewbutton").text() == "View Score") {
//				$("#landwardhoviewbutton").text("Close Score");
//			} else {
//				$("#landwardhoviewbutton").text("View Score");
//			}
//		}
//
//		// Devoid button
//		if ($(this).is("#devoidviewbutton")) {
//			$("#devoidview").toggleClass("hide");
//			if ($("#devoidviewbutton").text() == "View Score") {
//				$("#devoidviewbutton").text("Close Score");
//			} else {
//				$("#devoidviewbutton").text("View Score");
//			}
//		}
//		
//		// MuseScore UI / UX report button
//		else if ($(this).is("#reportviewbutton")) {
//			$("#reportview").toggleClass("hide");
//			if ($("#reportviewbutton").text() == "View Report") {
//				$("#reportviewbutton").text("Close Report");
//			} else {
//				$("#reportviewbutton").text("View Report");
//			}
//		}
//	});

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
	
	// =============================== Modal dynamic content filling
	$(".modalopener").on("click", function(){
		
		// Retrieve src and alt of child image and set it in the modal
		var src = $(this).find("img").attr("src");
		var alt = $(this).find("img").attr("alt");
		$("#modalimg").attr({src: src, alt: alt});
		
		// Retrieve the title and set it in the modal
		var title = $(this).find("h4").text();
		$("#modaltitle").text(title);
		
		// Retrieve the modal text
		var text = $(this).find("p").html();
		$("#modaltext").html(text);
	});
	
	// =============================== Modal video dynamic content filling
	$(".videomodalopener").on("click", function(){
		
		// Retrieve src and alt of child image and set it in the modal
		var src = $(this).find("img").attr("alt");
		var url = "https://www.youtube.com/embed/" + src;
		$("#modalvideo").attr("src", url);
		
		// Retrieve the title and set it in the modal
		var title = $(this).find("h4").text();
		$("#modaltitle").text(title);
		
		// Retrieve the modal text
		var text = $(this).find("p").html();
		$("#modaltext").html(text);
	});
	
	// ============================== Modal opening and closing
	$(window).on("click", function(event) {
		
		// Debugging - print target
		// alert(event.target.className);
		
		// If clicking on a modal opener, open the modal
		if (event.target.className.includes("modalopener")) {
			$("#modal").css("display", "block");
		}
		
		// If clicking on the background, hide the modal
		if (event.target.id == "modal") {
			$("#modal").css("display", "none");
		}
	});
	
	// ============================== Collapsable Opening / Closing
	$(".collapsible").on("click", function() {
		
		// Get current max height
		var height = $(this).next().css("max-height");
		
		// If open, close
		if (height != "0px") {
			$(this).next().css("max-height", 0);
			
		// Else, open
		} else {
			$(this).next().css("max-height", $(this).next().prop("scrollHeight"));
		}
	});
});
