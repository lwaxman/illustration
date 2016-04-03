/*
* Laurie Waxman
* Thesis 
* 28.03.16
*
* parseDate && daysEllapsed from:
* http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
*
*/

var canvas = document.getElementById("main");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;

var info = document.getElementById("infoContent");
var systemHealth = document.getElementById("system_health");
var systemDeadDeebs = document.getElementById("system_dead");
var systemYourFault = document.getElementById("system_yourFault");

var alertBox = document.getElementById('alertBox');

var jsonObjects = []; //array of all deebs from file
var deebs = []; //array of deebs to draw
var critterArray = []; //array of all critters to draw
var runCount = 0; 
var archiveImages = [];

var myImages = []; 
var myDeebs; 
var systemInfo; 
var points = 100;
// var days = 0; 

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1]-1, mdy[0]);
}

function daysEllapsed(first, second) {
    return Math.abs( Math.round((second-first)/(1000*60*60*24)) );
}

///////////////////////////////////////////////////////////////////////////////////////// MOUSE POSITIONS

//save mouse position to variables
var mouseX = w+200;
var mouseY = h+200;
document.onmousemove = function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}
document.onmouseleave = function(e){
	mouseX = w+200;
	mouseY = h+200;
}


//#############################################################################################################
//################################################################       ###      ##      ##      ####     ####
//################################################################  ####  ##  ######  ######  ###  #   ########
//################################################################  ####  ##      ##      ##      ###     #####
//################################################################  ####  ##  ######  ######  ###  ######   ###
//################################################################       ###      ##      ##      ###     #####
//#############################################################################################################
// ^ so I can see this shit in the thumbnail.


var dFills = [];
var dStroke;
var ddFills = [];
var ddStroke;

var deeb = {};
deeb.init = function(x, y, c, n){
	this.type = "deeb";
	this.index = c; 
	this.xPos = x; 
	this.yPos = y;
	this.state = 1;
	this.name = n;
	this.bodyWidth = random(100, 150); 
	this.bodyHeight = 130+random(-10, 20);
	this.points = random(0, this.bodyWidth*0.4);
	this.scared = false;
	this.scaredCount = 0;
	this.fill = dFills[0];
	this.bFill = dFills[1];
	this.stroke = dStroke;
	this.speed = random(3, 4, false);
	if(random(0,1)<1){
		this.speed=-this.speed;
	}
	this.eyeSize = random(20,30, false);
	this.mouthWidth = random(5,15);
	this.startHeight = this.bodyHeight;
	this.slugCount = random(0,10,false);
	this.slugPeriod = random(40,70);
	this.drawBody(x, y);
};
deeb.setup = function(x, y, n, p, bw, bh, s, sp, c){
	this.type = "deeb";
	this.points = p;
	this.index = c; 
	this.xPos = x; 
	this.yPos = y;
	this.name = n;
	this.hover = false;
	this.state = s;
	this.bodyWidth = bw;
	this.bodyHeight = bh;
	this.scared = false;
	this.scaredCount = 0;
	this.fill = dFills[0];
	this.bFill = dFills[1];
	this.stroke = dStroke;
	this.speed = random(map(points, 400, 0, 1, 3), map(points, 400, 0, 1, 5)+1, false);
	if(random(0,1)<1){ this.speed=-this.speed; }
	this.eyeSize = random(20,30, false);
	this.mouthWidth = random(5,15);
	this.startHeight = this.bodyHeight;
	this.slugCount = random(0,10,false);
	this.slugPeriod = random(40,70);
	this.drawBody(x, y);
};
deeb.update = function(){
	var bodyW = this.bodyWidth + map(points, 400, 0, -75, 50);

	if(this.state==0) bodyW = this.bodyWidth + map(this.points, 0, 200, -75, 50);
	//deeb hover
	if( this.hover ){	
		
		this.points += 0.05;
		this.scared = true;
		if((400-points)<=this.points && this.state != 0){ 
			this.state = 0; 
			var deathSound = new Audio('../assets/sounds/bell.wav');
			deathSound.play();
			alertBox.innerHTML = "STOP";
			setTimeout(function(){
				alertBox.innerHTML = "...";
	 		}, 2000);
		}else if((400-points)<=this.points && this.state == 0){
			alertBox.innerHTML = "R.I.P. " + this.name;
			setTimeout(function(){
				alertBox.innerHTML = "...";
	 		}, 2000); 
		}else{
			alertBox.innerHTML = "Stop that! You're scaring "+ this.name +"!";
			setTimeout(function(){
				alertBox.innerHTML = "...";
	 		}, 2000);
		}
	}
	if(this.state == 0){
		this.speed=0;
		this.fill = ddFills[0];
		this.bFill = ddFills[1];
	}else{
		this.xPos+=this.speed;
		if(this.speed>0){
			if(this.xPos > w+this.bodyWidth){
				this.xPos = -100; 
				this.yPos = random(100, h-100); 
			}
		}else{
			if(this.xPos < -100){
				this.xPos = w+100; 
				this.yPos = random(100, h-100); 
			}
		}
		this.slugCount++;
		var amplitude = 7;
		var y = Math.sin( (this.slugCount/this.slugPeriod*2*Math.PI)+Math.PI ) * amplitude;
		this.bodyHeight = this.startHeight+y;
	}
	this.drawBody(this.xPos, this.yPos);
};
deeb.drawBody = function(x, y){
	var bodyW = this.bodyWidth + map(points, 400, 0, -75, 50);
	if(this.state==0) bodyW = this.bodyWidth + map(this.points, 0, 200, -75, 50); 
	//round
	fill(this.bFill);
	stroke(this.stroke);
	pEllipse(x, y-this.bodyHeight+(bodyW/2), bodyW, bodyW, 179, 360);
	fill(this.fill);
	fEllipse(x, y-this.bodyHeight+(bodyW/2), bodyW*0.8, bodyW*0.9, 179, 360);
	//main body
	fill(this.bFill);
	fRect(x-(bodyW/2), y-this.bodyHeight+(bodyW/2)-1, bodyW, this.bodyHeight-(bodyW/2));
	fill(this.fill);
	fRect(x-(bodyW*0.8/2), y-this.bodyHeight+(bodyW/2)-2, bodyW*0.8, this.bodyHeight-(bodyW/2));
	//outline
	pLine(x-(bodyW/2), y-this.bodyHeight+(bodyW/2)-2, x-(bodyW/2), y-2);
	pLine(x+(bodyW/2), y-this.bodyHeight+(bodyW/2)-2, x+(bodyW/2), y-2);
	pLine(x-(bodyW/2), y-2, x+(bodyW/2), y-2);
	this.face();
};
deeb.face = function(){

	this.pupilSize = 2;

	var eyeSize = map(points, 400, 100, this.eyeSize*0.6, this.eyeSize);
	var eyeMinH = this.bodyHeight*0.75; 
	var eyeMaxH = this.bodyHeight*0.95;
	var eyeHeight = Math.max(eyeMinH, Math.min(map(points, 400, 200, eyeMinH, eyeMaxH), eyeMaxH));
	var mouthOpen = map(points, 400, 0, -20, 20);
	if(this.scared == true){
		this.pupilSize = eyeSize*0.25;
		this.scaredCount++;
		this.speed=-this.speed;
		if(mouthOpen > 3) mouthOpen = 1; 
		if(mouthOpen == 1) this.mouthWidth = 5;
		if(this.scaredCount>6){
			this.scared = false;
			this.scaredCount = 0;
		}
	}
	//eyes
	fill("white");
	for(var i=-2; i<3; i+=4){
		fEllipse(this.xPos-(10*i), this.yPos-eyeHeight, eyeSize, eyeSize);
	}
	fill("black");
	if(this.state==0){
		for(var i=-2; i<3; i+=4){
			stroke('grey');
			pEx(this.xPos+(10*i), this.yPos-eyeHeight, 5, 5);
		}
		eyeSize = this.eyeSize*0.6;
	}else{
		for(var i=-2; i<3; i+=4){
			ellipse(this.xPos+(10*i), this.yPos-eyeHeight, this.pupilSize);
		}
	}
	//mouth
	noFill();
	stroke('grey');
	if(this.state!=0){	
		if(mouthOpen>-5 && mouthOpen<5){
			pLine(this.xPos-this.mouthWidth, this.yPos-eyeHeight+20, this.xPos+this.mouthWidth, this.yPos-eyeHeight+20);
		}else{
			pEllipse(this.xPos, this.yPos-eyeHeight+20, this.mouthWidth*2, mouthOpen, 0, 180);
		}
	}
};

//############################################################################################################
//############################################################      ##  #######       ##       ####       ####
//############################################################  ######  #######  ###  ##  ####  ###  ###  ####
//############################################################      ##  #######  ###  ##      #####       ####
//############################################################  ######  #######  ###  ##  ###  ####  ###  ####
//############################################################  ######       ##       ##  ####   ##  ###  ####
//############################################################################################################

//////////////////////////////////////////////////////////////////////////////////////////// FLOWER
var flower = {};
flower.setup = function(x, y){
	this.type = "flower";
	this.xPos = x; 
	this.yPos = y;
	this.hover = false;

	var hue = 27+random(-20,20);
	var sat = map(points, 200, 400, 100, 40);
	var bri = map(points, 200, 400, 70, 50) + random(-10, 10);

	if(points<=200){ bri = 60; sat = 100; }
	else if(points>=400){ bri = 40; sat = 40; }

	this.fill = "hsla("+hue+", "+sat+"%, "+bri+"%, 1)";
	this.stroke =  "hsla(358, "+sat+"%, "+(bri+10)+"%, 1)";

	this.flowerCount = random(3,5);
	this.stemLengths = [];
	this.stemOffsets = [];
	this.flowerSizes = [];
	for(var i=0; i<this.flowerCount; i++){
		this.stemLengths[i] = random(30,100);
		this.stemOffsets[i] = random(-45,45);
		this.flowerSizes[i] = random(15,30);
	}
};
flower.update = function(){
	stroke(this.stroke);
	fill(this.fill);
	for(var i=0; i<this.flowerCount; i++){
		this.drawStem(this.xPos, this.yPos, this.xPos+this.stemOffsets[i], this.yPos-this.stemLengths[i], this.flowerSizes[i]);
	}
	if( this.hover ){
		alertBox.innerHTML = "Please, don't pick the flowers!";
		setTimeout(function(){
			alertBox.innerHTML = "...";
		}, 2000);
	}


};
flower.drawStem = function(x1, y1, x2, y2, r){
	pLine(x1, y1, x2, y2);
	pEllipse(x2, y2, r, r);
};

//////////////////////////////////////////////////////////////////////////////////////////// PLANT 
var plant = {};
plant.setup = function(x, y){
	this.type = "plant";
	this.xPos = x; 
	this.yPos = y;
	this.hover = false;
	var bri = map(points, 200, 400, 60, 40);
	var sat = map(points, 200, 400, 100, 80);
	var hue = map(points, 200, 400, 60, 40);
	if(points<=200){ bri = 60; sat = 100; hue = 60; }
	else if(points>=400){ bri = 40; sat = 80; hue = 40; }
	this.fill = "hsla("+hue+", 100%, "+bri+"%, 1)";
	this.stroke =  "hsla("+(hue-5)+", 100%, "+bri+"%, 1)";
	this.width = 30; 
	this.height = random(75, 135);
	this.loop = 0; 
	this.images = [];
	
	tempCanvas.width = this.width;
	tempCanvas.height = this.height;
	setCanvas(tempC);
	for(var i=0; i<3; i++){
		this.draw();
		this.images[i] = new Image;
		this.images[i].src = tempCanvas.toDataURL();
	}
	resetCanvas();
};
plant.draw = function(){
	stroke(this.stroke);
	fill(this.fill);
	pLine(this.width/2, this.height, this.width/2, this.height-100);
	pEllipse(this.width/2, this.height-(this.height-35), 30, 30);
	pEllipse(this.width/2, this.height-(this.height-20), 20, 20);
	pEllipse(this.width/2, this.height-(this.height-8), 10, 10);
};
plant.update = function(){
	this.loop++;
	if(this.loop>=3) this.loop = 0; 
	c.drawImage(this.images[this.loop], this.xPos, this.yPos-this.height);
};
//////////////////////////////////////////////////////////////////////////////////////////// BUSH 

var bush = {};
bush.setup = function(x, y){
	this.type = "bush";
	this.xPos = x; 
	this.yPos = y;
	this.hover = false;
	this.loop = 0; 

	var bri = map(points, 200, 400, 60, 40);
	var sat = map(points, 200, 400, 100, 40);
	if(points<=200){ bri = 60; sat = 100; }
	else if(points>=400){ bri = 40; sat = 40; }
	this.fill = "hsla(360, "+sat+"%, "+bri+"%, 1)";
	this.stroke =  "hsla(368, "+sat+"%, "+(bri+10)+"%, 1)";

	this.width = random(100,150);
	this.height = random(100, 150);
	this.images = [];

	tempCanvas.width = this.width;
	tempCanvas.height = this.height;
	setCanvas(tempC);
	for(var i=0; i<3; i++){
		this.draw();
		this.images[i] = new Image;
		this.images[i].src = tempCanvas.toDataURL();
	}
	resetCanvas();
};
bush.draw = function(){
	background();
	stroke(this.stroke);
	fill(this.fill);
	pEllipse(this.width/2, this.height, this.width-2, this.height, 180, 360);
};
bush.update = function(){
	this.loop++;
	if(this.loop>=3) this.loop = 0; 
	c.drawImage(this.images[this.loop], this.xPos, this.yPos-this.height);
};

//////////////////////////////////////////////////////////////////////////////////////////// GRASS 
var grass = {};
grass.setup = function(x, y){
	this.type = "grass";
	this.xPos = x; 
	this.yPos = y;

	var sat = map(points, 200, 400, 100, 10);
	if(points<=200){ sat = 100; }
	else if(points>=400){ sat = 10; }
	this.stroke =  "hsla(290, "+sat+"%, 30%, 1)";

	this.bladeCount = random(2,5);
	this.bladeLengths = [];
	for(var i=0; i<this.bladeCount; i++){
		this.bladeLengths[i] = random(5,20);
	}
};
grass.update = function(){
	stroke(this.stroke);
	for(var i=0; i<this.bladeCount; i++){
		pLine(this.xPos-(i*7), this.yPos, this.xPos-(i*7), this.yPos-this.bladeLengths[i]);
	}
};

//////////////////////////////////////////////////////////////////////////////////////////// ROCK 
var rock = {};
rock.setup = function(x, y){
	this.type = "rock";
	this.xPos = x; 
	this.yPos = y;
	this.hover = false;
	this.fill = "#8B408F";

	var sat = map(points, 200, 400, 65, 10);
	var bri = map(points, 200, 400, 45, 45);
	if(points<=200){ sat = 65; bri = 45; }
	else if(points>=400){ sat = 10; bri = 45; }
	this.fill = "hsla(290, "+sat+"%, "+bri+"%, 1)";
	this.stroke = "hsla(290, "+sat+"%, "+(bri-10)+"%, 1)";

	this.loop = 0;
	this.width = random(100, 300);
	this.height = random(100, 150);

	this.sectionCount = random(2,5);
	this.sectionXOffsets = [];
	this.sectionYPoss = [];
	this.sectionHeights = [];
	this.sectionWidths = [];
	for(var i=0; i<this.sectionCount; i++){
		this.sectionWidths[i] = random(40,100);
		this.sectionHeights[i] = random(30,150);
		var offsetRange = this.width - this.sectionWidths[i];
		this.sectionXOffsets[i] = random(offsetRange, this.width-offsetRange);
	}

	this.images = [];
	tempCanvas.width = this.width;
	tempCanvas.height = this.height;
	setCanvas(tempC);
	for(var i=0; i<3; i++){
		this.draw();
		this.images[i] = new Image;
		this.images[i].src = tempCanvas.toDataURL();
	}
	resetCanvas();
};
rock.draw = function(){
	stroke(this.stroke);
	fill(this.fill);
	for(var i=0; i<this.sectionCount; i++){
		pEllipse(this.sectionXOffsets[i]-this.sectionWidths[i]/2, this.height, this.sectionWidths[i], this.sectionHeights[i], 180, 360);
	}
};
rock.update = function(){
	if(this.hover){
		alertBox.innerHTML = "Just a rock."
		setTimeout(function(){
			alertBox.innerHTML = "..."
		}, 2000);
	}
	this.loop++;
	if(this.loop>=3) this.loop = 0; 
	c.drawImage(this.images[0], this.xPos, this.yPos-this.height);
};
