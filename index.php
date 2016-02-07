<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Form WebMasters</title>
<link rel="stylesheet" href="style.css">
</head>

<body>
<?php

require_once "connect_db.php";

if (isset($_COOKIE['email']) && isset($_COOKIE['password'])) {
	print "<h1>You are logged in as {$_COOKIE['email']} </h1>";
} else {

?>

<button onClick="regToLog('register', this);" class="click" id="btnRegister">Register</button>
<button onClick="regToLog('login', this);" class="no_click" id="btnLogin">Log In</button>
<button onClick="changeLang('ru', this);" class="no_click" id="btnRu">Ru</button>
<button onClick="changeLang('en', this);" class="click" id="btnEn">Eng</button>

<form action="handle.php" method="post" name="form" id="form" lang="en">
	<p id="textEmail">Email * (this will be your login):</p>
    <input type="email" name="email" id="email" onBlur="busyOrNot(this);" autofocus required="required" /><span id="busy" class="busy"></span>
    <p id="textPassword">Password * :</p>
    <input type="password" name="password" id="password" required="required" />
    <input type="checkbox" id="checkbox" onClick="showPass();" /><br /><br />
    <input type="submit" name="submit" value="Registration" id="submit" />
</form>

<?php
}
?>
<script src="lang.js"></script>
<script src="script.js"></script>
</body>
</html>