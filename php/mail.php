<?php
	// Take in user input, filtering bad results
	$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	$fname = htmlspecialchars($_POST['firstname']);
	$lname = htmlspecialchars($_POST['lastname']);
	$subject = htmlspecialchars($_POST['subject']);
	$content = htmlspecialchars($_POST['content']);
	$organization = htmlspecialchars($_POST['organization']);

	// Make sure no items are blank (shouldn't be due to jQuery form handling)
	if (empty($email) || empty($fname) || empty($lname) || empty($subject) || empty($content))
	{
		http_response_code(500);
		echo "One or more parameters are invalid or empty!"; // <- xhr.responseText
		exit;
	}


	// Create message header
	$name = $fname . " " . $lname;
	$headers = "From: " . $name . " <" . $email . ">" .  PHP_EOL .
		"Reply-To: " . $fname . " " . $lname . " <" . $email . ">" .  PHP_EOL .
		"X-Mailer: PHP/" . phpversion() .  PHP_EOL .
		"MIME-Version: 1.0" . PHP_EOL . "Content-type: text/html; charset=UTF-8";
	// If an organization is present, add it to the headers
	if (!empty($organization)) { $headers .= PHP_EOL ."Organization: " . $organization; }

	
	// Create email content
	$msg = "<html><body style='font-family: Verdana, Geneva, sans-serif'>";
	$msg .= $content .  PHP_EOL;
	$msg .= "--" . PHP_EOL . "<img src='http://bradschmitz.com/img/logo.png'>" . PHP_EOL . "<p>This email was sent via the Contact form on bradschmitz.com.";
	$msg .= "</body></html>";

	
  	// Send mail
  	$sent = mail("schmitb3@miamioh.edu", $subject, $msg, $headers);


	// If there was a failure sending, make a note
	if (!$sent) {
		http_response_code(500);
		echo "Something went wrong in sending the email!"; // <- xhr.responseText
		exit;
	} else {
		http_response_code(200);
		exit;
	}
?>
