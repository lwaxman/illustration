<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>FLINDALL</title>
        <style>
			*{ margin: 0; }
			body{  background:#8F6191; overflow: hidden;}
            p{
                position: absolute;
                top: 50px;
                padding: 2px 5px 2px 50px;
                text-decoration: none;
                font-size: 10pt;
                background: black;
                color: white;
                font-family: "monaco", "menlo", monospace;
            }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.js"></script>
    </head>
    <body>
    	<canvas id="main"></canvas>
        <p>Flindall</p>
        <script src="assets/creatures.json"></script>
        <script src="js/pen.js"></script>
        <script src="js/flindall.js"></script>
    </body>
</html>