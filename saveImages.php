<?php 

	$data = $_POST['urls'];
	$file = 'assets/archive.txt';

	$current = file_get_contents($file);
	$current .= $data;
	file_put_contents($file, $current);


?>
