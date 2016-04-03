<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>FLANDILL</title>
        <style>
			body{
				background: red;
			}
			#imageContainer{
				width: 60%;
				max-width: 800px;
				background: white;
				margin: 0 auto;
			}
			#imageContainer img{
				width: 100%;
			}
			#firstLast img{
				width: 50%;
			}

        </style>
    </head>
    <body>
    	<div id="imageContainer"> 		
	        <?php 
	            $file = 'assets/archive.txt';
	            $current = file_get_contents($file);
	            $images = split(">", $current);

	            echo "<div id='firstLast'>";
	            echo "<img src='".$images[0]."' id='first'><img src='".$images[ count($images)-2 ]."'  id='last'>";
	            echo "</div>";

	            echo "<p>".count($images)."</p>";
	            for ($i = 0; $i < count($images); $i++){
	                echo "<img src='".$images[$i]."' class='frame' id='image".$i."'>";
	            }

	        ?>
    	</div>
    </body>
</html>