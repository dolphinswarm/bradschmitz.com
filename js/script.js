// On document ready, prepare jQuery
$(document).ready(function() 
{
	// Set a local storage alias
	let storage = window.localStorage;

	// ===========
	// On page load, load a random background
	// ===========
	let backgroundNum = Math.floor(Math.random() * 6) + 1;
	let file = "media/background-" + backgroundNum + ".mp4";
	$("#background-video-source").attr("src", file);
	$("#background-video").get(0).load();
	
	
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
	// On page load, replace the year
	// ===========
	$("#copyright-label").text(function()
	{
		return $(this).text().replace("{year}", new Date().getFullYear());
	});
	
	// ===========
	// Function for autopausing audio if another starts playing
	// ===========
	$("audio").on("play", function()
	{
		$("audio").not(this).each(function(index, audio)
		{
			audio.pause();
		});
	});
	
	// ===========
	// Function for populating a modal
	// ===========
	$(".gallery-item").on("click", function()
	{
		// Retrieve src and alt of child image
		var src = $(this).find("img").attr("src");
		var alt = $(this).find("img").attr("alt");
		
		// If we want to use an image, than specify so
		if (alt.toLowerCase().includes("image"))
		{
			$("#modal-video").css("display", "none");
			$("#modal-img").css("display", "block");
			$("#modal-img").attr({src: src, alt: alt});
		}
		else
		{
			$("#modal-video").css("display", "block");
			$("#modal-img").css("display", "none");
			$("#modal-video").attr("src", alt);
			$("#modal-video").get(0).muted = false;
			$("#modal-video").get(0).play();
		}
		
		// Retrieve the title and set it in the modal
		var title = $(this).find("h3").text();
		$("#modal-title").text(title);
		
		// Retrieve the modal text
		var text = $(this).find("div").children().clone();
		$("#modal-text").html(text);
	});
	
	// ===========
	// Function for opening and closing a collapsible
	// ===========
	$(".collapsible").on("click", function()
	{
		// Get the collapsible content
		var content = $(this).next();
		
		// Get current max height
		var height = content.css("max-height");
		
		// If open, close
		if (height != "0px") {
			content.css("max-height", 0);
			
		// Else, open
		} else {
			content.css("max-height", content.prop("scrollHeight"));
		}
	});
	
	// ===========
	// Function for pausing and playing the background
	// ===========
	$("#playback-button").on("click", function()
	{
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
	// Function for opening / closing a modal
	// ===========
	$(window).on("click", function(event)
	{	
		// If clicking on a modal opener, open the modal
		if (event.target.className.includes("modal-opener"))
		{
			// Make the modal visible
			$("#modal-background").css({"visibility": "visible", "opacity": 1});
			$("#modal").css({"transform": "scale(1.0)"});
		}
		
		// If clicking on the background, hide the modal
		else if (event.target.id == "modal-background")
		{
			$("#modal-background").css({"visibility": "hidden", "opacity": 0});
			$("#modal").css({"transform": "scale(0.0)"});
			$("#modal-video").get(0).muted = true;
			$("#modal-video").get(0).pause();
		}
	});
});