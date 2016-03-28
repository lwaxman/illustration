////////////////////////////////////////////////////////////////////////////////////// TEMP 
// for rendering objects on setup

var tempCanvas = document.createElement("canvas");
tempCanvas.width = 100;
tempCanvas.height = 100;
var tempC = tempCanvas.getContext("2d");

////////////////////////////////////////////////////////////////////////////////////// BACKGROUND 
// self explanatory title

var textureMarker = document.createElement("canvas");
var txMarker = textureMarker.getContext("2d");
textureMarker.width = window.innerWidth;
textureMarker.height = window.innerHeight;

var txSaturation = map(points, 0, 200, 10, 60);
txMarker.fillStyle = "hsla(290,"+txSaturation+"%,50%,1)";
txMarker.fillRect(0, 0, textureMarker.width, textureMarker.height);
for(var i=0; i<10000; i++){
	txMarker.fillStyle = "hsla(290,"+txSaturation+"%,"+random(40,60)+"%,0.2)";
	txMarker.beginPath();
	txMarker.ellipse(random(0,w), random(0,h), random(5,10), random(5,10), deg(random(0,360)), 0, 2*Math.PI);
	txMarker.fill();
	txMarker.closePath();
}
c = canvas.getContext("2d");
var bgPattern = c.createPattern(textureMarker, "repeat");

///////////////////////////////////////////////////////////////////////////////////// DEEB FILLS 
// deeb fills. front and back done in one loop for efficiency (?)
// deebs have different fills based on their health

var deebFront_c = document.createElement("canvas");
var deebFront = deebFront_c.getContext("2d");
deebFront_c.width = window.innerWidth;
deebFront_c.height = window.innerHeight;

var deebBack_c = document.createElement("canvas");
var deebBack = deebBack_c.getContext("2d");
deebBack_c.width = window.innerWidth;
deebBack_c.height = window.innerHeight;

var getDeebStroke = function(p){
	var dbSaturation = map(p, 0, 200, 10, 60);
	var dbLightness = map(p, 0, 200, 70, 50);

	return "hsla(180,"+dbSaturation+"%,"+(dbLightness-20)+"%,0.2)";
}

var getDeebFills = function(p){

	var dbSaturation = map(p, 0, 200, 10, 60);
	var dbLightness = map(p, 0, 200, 70, 50);

	deebFront.fillStyle = "hsla(180,"+dbSaturation+"%,"+dbLightness+"%,1)";
	deebFront.fillRect(0, 0, deebFront_c.width, deebFront_c.height);

	deebBack.fillStyle = "hsla(180,"+dbSaturation+"%,"+(dbLightness+10)+"%,1)";
	deebBack.fillRect(0, 0, deebFront_c.width, deebFront_c.height);

	for(var i=0; i<10000; i++){
		deebFront.fillStyle = "hsla(180,"+dbSaturation+"%,"+random(dbLightness,dbLightness+10)+"%,0.2)";
		deebFront.beginPath();
		deebFront.arc(random(0,w), random(0,h), random(2,3) ,0, 2*Math.PI);
		deebFront.fill();
		deebFront.closePath();

		deebBack.fillStyle = "hsla(180,"+dbSaturation+"%,"+random(dbLightness,dbLightness+10)+"%,0.2)";
		deebBack.beginPath();
		deebBack.arc(random(0,w), random(0,h), random(2,3), 0, 2*Math.PI);
		deebBack.fill();
		deebBack.closePath();
	}

	var frontFill = c.createPattern(deebFront_c, "repeat");
	var backFill = c.createPattern(deebBack_c, "repeat");

	return [frontFill, backFill];
}

var deadDeebFront_c = document.createElement("canvas");
var deadDeebFront = deadDeebFront_c.getContext("2d");
deadDeebFront_c.width = window.innerWidth;
deadDeebFront_c.height = window.innerHeight;

var deadDeebBack_c = document.createElement("canvas");
var deadDeebBack = deadDeebBack_c.getContext("2d");
deadDeebBack_c.width = window.innerWidth;
deadDeebBack_c.height = window.innerHeight;

var getDeadDeebFills = function(){

	deadDeebFront.fillStyle = "hsla(180,10%,70%,1)";
	deadDeebFront.fillRect(0, 0, deadDeebFront_c.width, deadDeebFront_c.height);

	deadDeebBack.fillStyle =  "hsla(180,10%,80%,1)";
	deadDeebBack.fillRect(0, 0, deadDeebFront_c.width, deadDeebFront_c.height);

	for(var i=0; i<10000; i++){
		deadDeebFront.fillStyle = "hsla(180,10%,"+random(70,80)+"%,0.2)";
		deadDeebFront.beginPath();
		deadDeebFront.arc(random(0,w), random(0,h), random(2,3) ,0, 2*Math.PI);
		deadDeebFront.fill();
		deadDeebFront.closePath();

		deadDeebBack.fillStyle = "hsla(180,10%,"+random(70,80)+"%,0.2)";
		deadDeebBack.beginPath();
		deadDeebBack.arc(random(0,w), random(0,h), random(2,3), 0, 2*Math.PI);
		deadDeebBack.fill();
		deadDeebBack.closePath();
	}

	var frontFill = c.createPattern(deadDeebFront_c, "repeat");
	var backFill = c.createPattern(deadDeebBack_c, "repeat");

	return [frontFill, backFill];
}