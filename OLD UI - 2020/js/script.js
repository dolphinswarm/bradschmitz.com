// On document ready, prepare jQuery
$(document).ready(function() 
{
	// =============================== GLOBAL VARIABLES
	var previousTab = new Object();
	var currentTab = new Object();
	var storage = window.localStorage;
	
	// ===========
	// On page load, set the pause status of the background.
	// ===========
	// If nothing in local storage, add it
	if (storage.length == 0)
		storage.setItem("Playback", "Pause");
	
	// Set the icon and value based on localstorage
	if (storage.getItem("Playback") == "Play")
	{
		// Update the visuals
		$("#playback-button").find("i").addClass("fa-pause");
		$("#playback-button").find("i").removeClass("fa-play");
		$("#playback-button").find("h2").text("Pause Background");
		
		// Play the background
		$("#background").find("video").trigger('play');
	}
	else
	{
		// Update the visuals
		$("#playback-button").find("i").removeClass("fa-pause");
		$("#playback-button").find("i").addClass("fa-play");
		$("#playback-button").find("h2").text("Play Background");
		
		// Play the background
		$("#background").find("video").trigger('pause');
	}
	
	// ===========
	// Function for closing and opening tabs based on window size.
	// ===========
	$(window).on("resize", function() {

		// If window is greater than 768px, collapse sidenav
		if ($(window).width() > 768 - 18) {
			if ($("#hamburger-border").hasClass("is-active")) {
				$("#hamburger-border").removeClass("is-active");
			}
			$("#side-navbar").css({"width": "0%", "vertical-align": "middle",  "border-right": "0px solid #F7941E"});
			$("#cover").css({"width": "0%", "height": "0%", "background-color": "rgba(0,0,0,0.0)"});
		}
	})
	
	// ===========
	// Function for opening and closing tabs of main navbar
	// ===========
	$(".tab").on("click", function()
	{
		// Get previous and current tabs
		previousTab = currentTab;
		currentTab = $(this);
		
		// Toggle the rotate classes
		$(currentTab).find("img").toggleClass("rotate-img");
		$(currentTab).find("i").toggleClass("rotate-arrow");
		
		// If the previous tab is different from the current tab...
		if ($(currentTab).index() !== $(previousTab).index())
		{
			// Toggle the rotate classes
			if ($(previousTab).find("img").hasClass("rotate-img")) 
			{
				$(previousTab).find("img").toggleClass("rotate-img");
				$(previousTab).find("i").toggleClass("rotate-arrow");			
			}

			// Show the current subtabs and hide previous subtabs
			$(currentTab).find(".subtab").css("height", "60px");
			$(previousTab).find(".subtab").css("height", "0px");
		}
		// Else
		else
		{
			// Show / hide the subtabs conditionally
			if ($(currentTab).find("img").hasClass("rotate-img")) 
				$(currentTab).find(".subtab").css("height", "60px");	
			else
				$(currentTab).find(".subtab").css("height", "0px");
		}
	})

	// ===========
	// Function for opening and closing tabs of the hamburger menu
	// ===========
	$("#hamburger-border").on("click", function()
	{
		// Toggle animation for open / close
		$("#hamburger-border").toggleClass("is-active");
		
		// Change the width of the sidebar
		if ($("#side-navbar").css("vertical-align") == "middle")
			$("#side-navbar").css({"width": "75%", "vertical-align": "sub", "border-right": "5px solid #F7941E"});
		else
			$("#side-navbar").css({"width": "0%", "vertical-align": "middle",  "border-right": "0px solid #F7941E"});
		
		// Change the width of the background cover
		if ($("#cover").css("width") == "0px")
			$("#cover").css({"width": "100%", "height": "100%", "background-color": "rgba(0,0,0,0.6)"});
		else
			$("#cover").css({"width": "0%", "height": "0%", "background-color": "rgba(0,0,0,0.0)"});
	})
	
	// ===========
	// Function for autopausing audio / video if another starts playing
	// ===========
	$("audio").on("play", function() {
		$("audio").not(this).each(function(index, audio) {
			audio.pause();
		});
	});

//	$("video").on("play", function() {
//		$("video").not(this).each(function(index, video) {
//			video.pause();
//		});
//	});
	
	// ===========
	// Function for pausing and playing the background
	// ===========
	$("#playback-button").on("click", function() {
		// If currently pause, set to play
		if (storage.getItem("Playback") == "Play")
		{
			// Update the visuals
			$("#playback-button").find("i").removeClass("fa-pause");
			$("#playback-button").find("i").addClass("fa-play");
			$("#playback-button").find("h2").text("Play Background");
			storage.setItem("Playback", "Pause");
			
			// Play the background
			$("#background").find("video").trigger('pause');
		}
		// Else, set to pause
		else
		{
			$("#playback-button").find("i").addClass("fa-pause");
			$("#playback-button").find("i").removeClass("fa-play");
			$("#playback-button").find("h2").text("Pause Background");
			storage.setItem("Playback", "Play");
			
			// Pause the background
			$("#background").find("video").trigger('play');
		}
	});

	// ===========
	// Function for opening and closing a collapsible
	// ===========
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

	// ===========
	// Function for dynamically populating a modal
	// ===========
	$(".modal-opener").on("click", function(){
		
		// Retrieve src and alt of child image and set it in the modal
		var src = $(this).find("img").attr("src");
		var alt = $(this).find("img").attr("alt");
		$("#modal-img").attr({src: src, alt: alt});
		
		// Retrieve the title and set it in the modal
		var title = $(this).find("h4").text();
		$("#modal-title").text(title);
		
		// Retrieve the modal text
		var text = $(this).find("p").html();
		$("#modal-text").html(text);
	});

	// ===========
	// Function for dynamically populating a video modal
	// ===========
	$(".video-modal-opener").on("click", function(){
		
		// Retrieve src and alt of child image and set it in the modal
		var src = $(this).find("img").attr("alt");
		var url = "https://www.youtube.com/embed/" + src;
		$("#youtube-video").attr("src", url);
		
		// Retrieve the title and set it in the modal
		var title = $(this).find("h4").text();
		$("#modal-title").text(title);
		
		// Retrieve the modal text
		var text = $(this).find("p").html();
		$("#modal-text").html(text);
	});
	
	// ===========
	// Function for dynamically populating a picture modal
	// ===========
	$(".picture-modal-opener").on("click", function(){
		
		// Retrieve src and alt of child image and set it in the modal
		var src = $(this).find("img").attr("src");
		var alt = $(this).find("img").attr("alt");
		$("#modal-img-fullscreen").attr({src: src, alt: alt});
	});

	// ===========
	// Function for opening / closing a modal
	// ===========
	$(window).on("click", function(event) {
		
		// Debugging - print target
		// alert(event.target.className);
		
		// If clicking on a modal opener, open the modal
		if (event.target.className.includes("modal-opener")) {
			$("#modal").css("display", "block");
		}
		
		// If clicking on the background, hide the modal
		if (event.target.id == "modal") {
			$("#modal").css("display", "none");
			
			// If a video, remove the source
			if ($("#modal").find("iframe") === 1);
				$("#modal").find("iframe").attr("src", "https://www.youtube.com/embed/");
		}
	});
	
});