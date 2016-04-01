<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>FLANDILL</title>
        <style>
			body{
				background: red;
			}

        </style>
    </head>
    <body>
    	<div id="imageContainer"> 		
	        <?php 
	            $file = 'assets/archive.txt';
	            $current = file_get_contents($file);
	            $images = split(">", $current);

	            for ($i = 0; $i < count($images); $i++){
	                echo "<img src='".$images[$i]."' class='frame' id='image".$i."'>";
	            }

	        ?>
    	</div>
    </body>
</html>