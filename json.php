<?php

    $json = $_POST['myData'];

    $drawingFile = fopen('creatures.txt', 'w');
	fwrite($drawingFile, 'hello world');


//     $file = "creatures.txt";
//     $current = file_get_contents($file);
// 	// $file = fopen("creatures.json", "w");
// 	file_put_contents($file, "hello world");
// ?>