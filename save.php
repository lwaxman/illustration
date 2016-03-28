<?php 

	$data = $_POST['json'];
	$file = 'assets/creatures.json';
	file_put_contents($file, $data);

?>
