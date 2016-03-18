<?php 

	$data = $_POST['json'];
	$file = 'assets/creatures.json';
	file_put_contents($file, $data);

	$data = $_POST['life'];
	$file = 'assets/life.json';
	file_put_contents($file, $data);

?>
