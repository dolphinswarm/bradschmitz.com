// On document ready, prepare jQuery
$(document).ready(function() 
{
	// =============================== GLOBAL VARIABLES
	var previousTab;
	var currentTab;
	
	// ===========
	// Function for closing and opening tabs based on window size.
	// ===========
	$(window).on("resize", function() {

		// If window is greater than 768px, collapse sidenav
		if ($(window).width() > 768 - 18) {
			if ($("#hamburger-border").hasClass("is-active")) {
				$("#hamburger-border").removeClass("is-active");
			}
			$("#side-navbar").css("width", "0%");
		}
	})
	
	// ===========
	// Function for opening and closing tabs of main navbar
	// ===========
	$(".tab").on("click", function()
	{
		// Get previous and current tabs
		previousTab = currentTab;
		currentTab = $(this).index();
		
		// Toggle the rotate classes
		$(".tab img").eq(currentTab).toggleClass("rotate-img");
		$(".tab i").eq(currentTab).toggleClass("rotate-arrow");
		
		// If the previous tab is different from the current tab...
		if (previousTab !== currentTab)
		{
			// Toggle the rotate classes
			if ($(".tab img").eq(previousTab).hasClass("rotate-img")) 
			{
				$(".tab img").eq(previousTab).toggleClass("rotate-img");
				$(".tab i").eq(previousTab).toggleClass("rotate-arrow");			
			}

			// Show the current subtabs and hide previous subtabs
			$(".tab").eq(currentTab).find(".subtab").css("height", "60px");
			$(".tab").eq(previousTab).find(".subtab").css("height", "0px");
		}
		// Else
		else
		{
			// Show / hide the subtabs conditionally
			if ($(".tab img").eq(currentTab).hasClass("rotate-img")) 
				$(".tab").eq(currentTab).find(".subtab").css("height", "60px");	
			else
				$(".tab").eq(currentTab).find(".subtab").css("height", "0px");
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
		if ($("#side-navbar").css("width") == "0px")
			$("#side-navbar").css("width", "75%");
		else
			$("#side-navbar").css("width", "0%");
		
		// Change the width of the background cover
		if ($("#cover").css("width") == "0px")
			$("#cover").css({"width": "100%", "height": "100%", "background-color": "rgba(0,0,0,0.5)"});
		else
			$("#cover").css({"width": "0%", "height": "0%", "background-color": "rgba(0,0,0,0.0)"});
	})
});