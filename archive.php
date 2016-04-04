<!doctype html>
<?php 
	$file = 'assets/archive.txt';
	$current = file_get_contents($file);
	$images = split(">", $current);
?>
<html>
	<head>
	    <meta charset="utf-8">
	    <title>FLANDILL</title>
	    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="assets/archive.css">
	</head>
	<body>
		<div id="imageContainer"> 		
			<div id='firstLast'>
			<?php 
				echo "<div id='last'><img src='".$images[ count($images)-2 ]."'></div>";
				echo "<div id='first'><img src='".$images[0]."'></div>";
			?>
			</div>
			<div id="elseContainer">
				<div class="arrow" id="left"> <p>&#10094;</p></div>
				<div id='everythingElse'>
				<?php
					for ($i = 0; $i < count($images); $i++){
						echo "<img src='".$images[$i]."' class='increment' id='image".$i."'>";
					}
				?>
				</div>
				<div class="arrow" id="right"> <p>&#10095;</p></div>
			</div>
			<p id="more">view incrementally</p>
		</div>
		<script>
			document.addEventListener("DOMContentLoaded",function(e){ 

				var showFull = false; 

				function getMousePos(imageBox, e) {
					var rect = imageBox.getBoundingClientRect(), root = document.documentElement;
					return mouseX = e.clientX - rect.left - root.scrollLeft;
				}

				var imageBox = document.getElementById('firstLast');
				var firstBox = document.getElementById('first');
				var everythingElse = document.getElementById('everythingElse');
				var everythingBox = document.getElementById('elseContainer');

				var more = document.getElementById('more');

				var inc; 
				if(window.innerWidth <= 1000){
					inc = 720;  
				}else{
					inc = 800; 
				}

				var images = document.getElementsByClassName("increment").length-2;
				everythingElse.style.width = images*inc+"px";


				console.log(images);


				imageBox.addEventListener('mousemove', function(e) {
					var mousePos = getMousePos(imageBox, e);
					firstBox.style.width = mousePos+"px";
				}, false);
				imageBox.addEventListener('mouseout', function(e) {
					firstBox.style.width = "400px";
				}, false);


				document.getElementById('more').addEventListener('click', function(e){
					showFull =! showFull; 
					if(showFull){
						imageBox.style.display = "none";
						everythingBox.style.display = "block";
						more.innerHTML = "view difference";
					}else{
						everythingBox.style.display = "none";
						imageBox.style.display = "block";
						more.innerHTML = "view incrementally";
					}
				});

				document.getElementById('left').addEventListener('click', function(e){
					if(elseContainer.scrollLeft > 0){
						elseContainer.scrollLeft -= inc;
					}
					console.log("left", elseContainer.scrollLeft);
				});
				document.getElementById('right').addEventListener('click', function(e){
					console.log(everythingElse.offsetWidth);
					if(elseContainer.scrollLeft < everythingElse.offsetWidth){
						elseContainer.scrollLeft += inc;
					}
					console.log("right", elseContainer.scrollLeft);
				});
			});
		</script>
	</body>
</html>