<?php

require_once "connect_db.php";
header("Content-Type: text/txt; charset=UTF-8");

if (!empty($_POST['busy'])) {
	$email = $_POST['busy'];
	$query = 'SELECT email FROM users WHERE email=?';
	$stmt = $pdo->prepare($query);
	$stmt->execute([$email]);
	foreach($stmt as $row){
		if(!empty($row['email']) && $row['email'] == $email){
			echo 'busy';
			exit();
		}
	}
	exit();
}

if (isset($_POST['submit']) 
	&& !empty($_POST['submit']) 
	&& ($_POST['submit'] === 'Registration' 
		|| $_POST['submit'] === 'Зарегистрироваться')
) {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$query = 'INSERT INTO users(email, password) VALUES(?, ?)';
	$stmt = $pdo->prepare($query);
	$stmt->execute([$email, $password]);
	setcookie("email", $email, time()+120);
	setcookie("password", $password, time()+120);
	header("Location: index.php");
} else if (isset($_POST['submit']) 
		   && !empty($_POST['submit']) 
		   && ($_POST['submit'] === 'Log In' 
			   || $_POST['submit'] === 'Войти')
) {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$query = 'SELECT email, password FROM users WHERE email=? AND password=?';
	$stmt = $pdo->prepare($query);
	$stmt->execute([$email, $password]);
	foreach($stmt as $row){
		if(!empty($row['email']) && $row['email'] == $email && !empty($row['password']) && $row['password'] == $password){
			setcookie("email", $email, time()+120);
			setcookie("password", $password, time()+120);
			header("Location: index.php");
		}
	}
}

?>