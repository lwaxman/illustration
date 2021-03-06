/*
* Laurie Waxman
* Thesis 
* 28.03.16
*
* Renders the fill images for deebs & background.
*
*/


///////////////////////////////////////////////////////////////////////////////////// TEMP 
// for rendering objects on setup

var tempCanvas = document.createElement("canvas");
tempCanvas.width = 100;
tempCanvas.height = 100;
var tempC = tempCanvas.getContext("2d");

////////////////////////////////////////////////////////////////////////////////////// BACKGROUND // self explanatory title

var bgPattern; 
var backgroundPattern = function(p){
	var textureMarker = document.createElement("canvas");
	var txMarker = textureMarker.getContext("2d");
	textureMarker.width = canvas.width;
	textureMarker.height = canvas.height;

	var txHue;
	var txSaturation;
	if(p > 400){
		txHue = map(p, 400, 800, -70, 80)
		txSaturation = map(p, 400, 800, 10, 60);
	}else{
		// console.log()
		txHue = 290; 
		txSaturation = map(p, 400, 0, 10, 60);
	}

	txMarker.fillStyle = "hsla("+txHue+","+txSaturation+"%,50%,1)";
	txMarker.fillRect(0, 0, textureMarker.width, textureMarker.height);

	var count = w*h/200;
	for(var i=0; i<count; i++){
		txMarker.fillStyle = "hsla("+txHue+","+txSaturation+"%,"+random(40,60)+"%,0.3)";
		txMarker.beginPath();
		txMarker.arc(random(0,w), random(0,h), random(5,10), random(5,10), 0, 2*Math.PI);
		txMarker.fill();
		txMarker.closePath();
	}
	c = canvas.getContext("2d");
	return c.createPattern(textureMarker, "repeat");
}

///////////////////////////////////////////////////////////////////////////////////// DEEB FILLS 
// deeb fills. front and back done in one loop for efficiency (?)
// deebs have different fills based on their health


var getDeebStroke = function(p){
	var dbSaturation = map(p, 400, 0, 10, 60);
	var dbLightness = map(p, 400, 0, 70, 50);

	return "hsla(180,"+dbSaturation+"%,"+(dbLightness-20)+"%,0.2)";
}

var getDeebFills = function(p){
	var deebFront_c = document.createElement("canvas");
	var deebFront = deebFront_c.getContext("2d");
	deebFront_c.width = canvas.width;
	deebFront_c.height = canvas.height;

	var deebBack_c = document.createElement("canvas");
	var deebBack = deebBack_c.getContext("2d");
	deebBack_c.width = canvas.width;
	deebBack_c.height = canvas.height;

	var dbSaturation = map(p, 400, 0, 10, 60);
	var dbLightness = map(p, 400, 0, 70, 50);
	
	deebFront.fillStyle = "hsla(180,"+dbSaturation+"%,"+dbLightness+"%,1)";
	deebFront.fillRect(0, 0, deebFront_c.width, deebFront_c.height);

	deebBack.fillStyle = "hsla(180,"+dbSaturation+"%,"+(dbLightness+10)+"%,1)";
	deebBack.fillRect(0, 0, deebFront_c.width, deebFront_c.height);

	var count = w*h/200;
	for(var i=0; i<count; i++){
		deebFront.fillStyle = "hsla(180,"+dbSaturation+"%,"+random(dbLightness,dbLightness+10)+"%,0.2)";
		deebFront.beginPath();
		deebFront.arc(random(0,w), random(0,h), random(2,5) ,0, 2*Math.PI);
		deebFront.fill();
		deebFront.closePath();

		deebBack.fillStyle = "hsla(180,"+dbSaturation+"%,"+random(dbLightness,dbLightness+10)+"%,0.2)";
		deebBack.beginPath();
		deebBack.arc(random(0,w), random(0,h), random(2,5), 0, 2*Math.PI);
		deebBack.fill();
		deebBack.closePath();
	}

	var frontFill = c.createPattern(deebFront_c, "repeat");
	var backFill = c.createPattern(deebBack_c, "repeat");

	return [frontFill, backFill];
}


var getDeadDeebFills = function(){
	var deadDeebFront_c = document.createElement("canvas");
	var deadDeebFront = deadDeebFront_c.getContext("2d");
	deadDeebFront_c.width = canvas.width;
	deadDeebFront_c.height = canvas.height;

	var deadDeebBack_c = document.createElement("canvas");
	var deadDeebBack = deadDeebBack_c.getContext("2d");
	deadDeebBack_c.width = canvas.width;
	deadDeebBack_c.height = canvas.height;

	deadDeebFront.fillStyle = "hsla(180,0%,50%,1)";
	deadDeebFront.fillRect(0, 0, deadDeebFront_c.width, deadDeebFront_c.height);

	deadDeebBack.fillStyle =  "hsla(180,0%,60%,1)";
	deadDeebBack.fillRect(0, 0, deadDeebFront_c.width, deadDeebFront_c.height);

	var count = w*h/200;
	for(var i=0; i<count; i++){
		var x = random(0,w); 
		var y = random(0,h);
		deadDeebFront.lineWidth = 2;
		deadDeebFront.lineCap = "round"; 
		deadDeebFront.strokeStyle = "hsla(180,0%,"+random(40,60)+"%,0.6)";
		deadDeebFront.beginPath();
		deadDeebFront.moveTo(x, y);
		deadDeebFront.lineTo(x+random(0, 20), y+random(0, -20));
		deadDeebFront.stroke();
		deadDeebFront.closePath();
	}

	var frontFill = c.createPattern(deadDeebFront_c, "repeat");
	var backFill = c.createPattern(deadDeebBack_c, "repeat");

	return [frontFill, backFill];
}