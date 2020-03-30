<?php
	// Take in user input, filtering bad results
	$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	$fname = htmlspecialchars($_POST['firstname']);
	$lname = htmlspecialchars($_POST['lastname']);
	$subject = htmlspecialchars($_POST['subject']);
	$content = htmlspecialchars($_POST['content']);
	$organization = htmlspecialchars($_POST['organization']);

	// Make sure no items are blank (shouldn't be due to jQuery form handling)
	//if (!isset($email) || !isset($fname) || !isset($lname) || !isset($subject) || !isset($content))
	if (empty($email) || empty($fname) || empty($lname) || empty($subject) || empty($content))
	{
		http_response_code(500);
		echo "One or more parameters are invalid or empty!"; // <- xhr.responseText
		exit;
//		print json_encode(array("first name" => $fname, "last name" => $lname));
//		echo '<script>alert(' . $fname . ');</script>';
//		echo "<script>console.log(Email:" . $email . ", First Name: " . $fname . ", Last Name: " . $lname . ", Subject " . $subject . ", Content: " . $content . "' );</script>";
//		exit();
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
	$msg = "<html><body>";
	$msg .= $content;
	$msg .= "<img src='http://bradschmitz.com/img/fav/apple-touch-icon-152x152.png'>";
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

  // if ($_SERVER["REQUEST_METHOD"] == "POST") {
  //   // Read in data from form
  //   $data = json_decode(file_get_contents('php://input'));
  //
  //   // Check to make sure data exists and is valid
  //   if ($data == null) {
  //     header("HTTP/1.1 500 Invalid data");
  //     exit();
  //   }
  //   // if (empty($data["email"]) || empty($data["fname"]) || empty($data["lname"]) || empty($data["subject"]) || empty($data["content"])) {
  //   //   header("HTTP/1.1 500 invalid data");
  //   //   exit();
  //   // }
  //
  //   // Create message
  //   $msg = "From " . $data["fname"] . " " . $data["lname"] . " (" . $data["email"] . "): \n" + $data["content"];
  //   mail("schmitb3@miamioh.edu", $data["subject"], $msg);
  //
  // } else {
  //   header("HTTP/1.1 500 Invalid request format");
  //   exit();
  // }
?>
