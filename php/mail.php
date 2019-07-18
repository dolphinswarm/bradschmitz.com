<?php
  // Take in user input, filtering bad results
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $fname = htmlspecialchars($_POST['fname']);
  $lname = htmlspecialchars($_POST['lname']);
  $subject = htmlspecialchars($_POST['subject']);
  $content = htmlspecialchars($_POST['content']);

  // Create message and header
  $name = $fname . " " . $lname;
  $headers = "From: " . $name . " <" . $email . ">" .  PHP_EOL .
  // $headers = "From: " . $fname . " " . $lname . " <" . $email . ">" .  PHP_EOL .
    "Reply-To: " . $fname . " " . $lname . " <" . $email . ">" .  PHP_EOL .
    'X-Mailer: PHP/' . phpversion() .  PHP_EOL .
    "MIME-Version: 1.0" . PHP_EOL . "Content-type: text/plain; charset=UTF-8";
  $msg = $content;

  // Send mail
  $sent = mail("schmitb3@miamioh.edu", $subject, $msg, $headers);

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
