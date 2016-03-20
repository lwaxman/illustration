/*
* 
* Laurie Waxman
* Thesis 
* 06.03.16
* 
* The land of Flandill. 
* 
* TO DO:
* - new creature
* - new creature
* - new plant : bush
* - new plant : spindly thing
* - new plant : 
* - flies?
* - rocks? 
* + grass bits
* ~ save & read from json
* - lemming sounds on death?
*
*/

var wind = 5;
var points = 100;
if(points>200){ points=200; }
else if(points<0){ points=0; }

var today = new Date();

var life = [];
life[0] = today; 
life[1] = points;

var lifeObject = JSON.stringify(life);

// $.ajax({
//     dataType : 'json', 
//     url : 'save.php',
//     type : 'POST',
//     success: function(r){
//     	console.log(r);
//     },
//     data : { life:lifeObject }
// });

// var lifeData = [];
// var xmlLife = new XMLHttpRequest();
// xmlLife.open('GET', '../assets/life.json');
// xmlLife.onreadystatechange = function() {
// 	if(xmlLife.readyState==4){

// 	}
// }
// xmlLife.send();

// get days ellapsed
// add days to realcount
// compare realcount to cappedcount

////////////////////////////////////////////////////////////////////////////////////////////////////// SETUP

////////////////////////////////////////////////////////////////////////////////////// BACKGROUND

var textureMarker = document.createElement("canvas");
var txMarker = textureMarker.getContext("2d");
textureMarker.width = window.innerWidth;
textureMarker.height = window.innerHeight;

var saturation = map(points, 0, 200, 10, 60);
txMarker.fillStyle = "hsla(290,"+saturation+"%,50%,1)";
txMarker.fillRect(0, 0, textureMarker.width, textureMarker.height);
for(var i=0; i<10000; i++){
	txMarker.fillStyle = "hsla(290,"+saturation+"%,"+random(40,60)+"%,0.2)";
	txMarker.beginPath();
	txMarker.ellipse(random(0,w), random(0,h), random(5,10), random(5,10), deg(random(0,360)), 0, 2*Math.PI);
	txMarker.fill();
	txMarker.closePath();
}
var bgPattern = c.createPattern(textureMarker, "repeat");

var textureDeeb_back = document.createElement("canvas");
var txDeeb_back = textureDeeb_back.getContext("2d");
textureDeeb_back.width = window.innerWidth;
textureDeeb_back.height = window.innerHeight;

var textureDeeb_front = document.createElement("canvas");
var txDeeb_front = textureDeeb_front.getContext("2d");
textureDeeb_front.width = window.innerWidth;
textureDeeb_front.height = window.innerHeight;

// var saturation = map(points, 0, 200, 10, 60);
txDeeb_front.fillStyle = "hsla(180,"+saturation+"%,65%,1)";
txDeeb_front.fillRect(0, 0, textureDeeb_front.width, textureDeeb_front.height);

txDeeb_back.fillStyle = "hsla(180,"+saturation+"%,70%,1)";
txDeeb_back.fillRect(0, 0, textureDeeb_front.width, textureDeeb_front.height);

for(var i=0; i<10000; i++){
	txDeeb_front.fillStyle = "hsla(180,"+saturation+"%,"+random(60,75)+"%,0.2)";
	txDeeb_front.beginPath();
	txDeeb_front.arc(random(0,w), random(0,h), random(2,3) ,0, 2*Math.PI);
	txDeeb_front.fill();
	txDeeb_front.closePath();

	txDeeb_back.fillStyle = "hsla(180,"+saturation+"%,"+random(60,75)+"%,0.2)";
	txDeeb_back.beginPath();
	txDeeb_back.arc(random(0,w), random(0,h), random(2,3), 0, 2*Math.PI);
	txDeeb_back.fill();
	txDeeb_back.closePath();
}
// var deebFill = c.createPattern(textureDeeb_front, "repeat");
var deeb_frontFill = c.createPattern(textureDeeb_front, "repeat");//'#eee';//c.createPattern(textureMarker, "repeat");
var deeb_backFill = c.createPattern(textureDeeb_back, "repeat");//'#bbb';

////////////////////////////////////////////////////////////////////////////////////////////////////// FAUNA

//////////////////////////////////////////////////////////////////////////////////////////// DEEBS

var deeb = {};
deeb.setup = function(x, y, n){
	this.type = "deeb";
	this.name = n;
	this.xPos = x; 
	this.yPos = y;
	this.bodyWidth = 40+(points*0.75)+random(-20, 20); 
	this.bodyHeight = 130+random(-10, 20);

	this.scared = false;
	this.scaredCount = 0;

	this.speed = random(3, 5, false);
	if(random(0,1)<1){
		this.speed=-this.speed;
	}

	this.eyeSize = random(20,30, false);
	this.mouthWidth = random(5,15);
	this.startHeight = this.bodyHeight;
	this.slugCount = random(0,10,false);
	this.slugPeriod = random(40,70);
	this.drawBody(x, y);
}
deeb.update = function(){
	this.fill = deeb_frontFill;
	this.bFill = deeb_backFill;
	if(points==0){
		this.speed=0;
		this.bFill="#fff";
		this.fill="#eee";
	}else{
		if(points>0 && points<=20){
			this.bFill = "#fff";
			this.fill = "#f4f9fa";
		}
		this.slugCount++;
		this.xPos+=this.speed;
		var amplitude = 7;
		var y = Math.sin( (this.slugCount/this.slugPeriod*2*Math.PI)+Math.PI ) * amplitude;
		this.bodyHeight = this.startHeight+y;
	}
	this.drawBody(this.xPos, this.yPos);
}
deeb.drawBody = function(x, y){
	fill(this.bFill);
	stroke('#79aeba');
	pEllipse(x, y-this.bodyHeight+(this.bodyWidth/2), this.bodyWidth, this.bodyWidth, 179, 360);
	fill(this.fill);
	fEllipse(x, y-this.bodyHeight+(this.bodyWidth/2), this.bodyWidth*0.8, this.bodyWidth*0.9, 179, 360);
	
	fill(this.bFill);
	fRect(x-(this.bodyWidth/2), y-this.bodyHeight+(this.bodyWidth/2)-2, this.bodyWidth, this.bodyHeight-(this.bodyWidth/2));
	fill(this.fill);
	fRect(x-(this.bodyWidth*0.8/2), y-this.bodyHeight+(this.bodyWidth/2)-2, this.bodyWidth*0.8, this.bodyHeight-(this.bodyWidth/2));

	pLine(x-(this.bodyWidth/2), y-this.bodyHeight+(this.bodyWidth/2)-2, x-(this.bodyWidth/2), y-2);
	pLine(x+(this.bodyWidth/2), y-this.bodyHeight+(this.bodyWidth/2)-2, x+(this.bodyWidth/2), y-2);
	pLine(x-(this.bodyWidth/2), y-2, x+(this.bodyWidth/2), y-2);
	this.face();
}
deeb.face = function(){
	var eyeSize = map(points, 0, 150, this.eyeSize*0.6, this.eyeSize);
	var eyeMinH = this.bodyHeight*0.75; 
	var eyeMaxH = this.bodyHeight*0.95;
	var eyeHeight = Math.max(eyeMinH, Math.min(map(points, 0, 100, eyeMinH, eyeMaxH), eyeMaxH));
	var mouthOpen = map(points, 0, 200, -20, 20);
	if(this.scared == true){
		this.pupilSize = eyeSize*0.25;
		this.mouthWidth = 5;
		this.scaredCount++;
		this.speed=-this.speed;
		mouthOpen = 1; 
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
	if(points==0){
		for(var i=-2; i<3; i+=4){
			pEx(this.xPos+(10*i), this.yPos-eyeHeight, 5, 5);
		}
	}else{
		for(var i=-2; i<3; i+=4){
			ellipse(this.xPos+(10*i), this.yPos-eyeHeight, this.pupilSize);
		}
	}
	//mouth
	noFill();
	stroke('grey');
	if(mouthOpen>-5 && mouthOpen<5){
		pLine(this.xPos-this.mouthWidth, this.yPos-eyeHeight+20, this.xPos+this.mouthWidth, this.yPos-eyeHeight+20);
	}else{
		pEllipse(this.xPos, this.yPos-eyeHeight+20, this.mouthWidth*2, mouthOpen, 0, 180);
	}
}


/////////////////////////////////////////////////////////////////////////////////////////////////////// FLORA

//////////////////////////////////////////////////////////////////////////////////////////// FLOWER
var flower = {};
flower.setup = function(x, y){
	this.type = "flower";
	this.xPos = x; 
	this.yPos = y;
	this.hue = 360+random(-20,20);
	this.brightness = random(50, 80);
	this.fill = "hsla("+ this.hue +", 100%, "+this.brightness+"%, 1.0)";
	this.flowerCount = random(3,5);
	this.stemLengths = [];
	this.stemOffsets = [];
	this.flowerSizes = [];
	for(var i=0; i<this.flowerCount; i++){
		this.stemLengths[i] = random(30,100);
		this.stemOffsets[i] = random(-45,45);
		this.flowerSizes[i] = random(15,30);
	}
}
flower.update = function(){
	stroke('#FF707A');
	fill(this.fill);
	for(var i=0; i<this.flowerCount; i++){
		this.drawStem(this.xPos, this.yPos, this.xPos+this.stemOffsets[i], this.yPos-this.stemLengths[i], this.flowerSizes[i]);
	}
}
flower.drawStem = function(x1, y1, x2, y2, r){
	pLine(x1, y1, x2, y2);
	// stroke
	pEllipse(x2, y2, r, r);
}

//////////////////////////////////////////////////////////////////////////////////////////// GRASS 
var grass = {};
grass.setup = function(x, y){
	this.type = "grass";
	this.xPos = x; 
	this.yPos = y;
	this.bladeCount = random(2,5);
	this.bladeLengths = [];
	for(var i=0; i<this.bladeCount; i++){
		this.bladeLengths[i] = random(5,20) ;
	}
}
grass.update = function(){
	stroke('purple');
	for(var i=0; i<this.bladeCount; i++){
		pLine(this.xPos-(i*7), this.yPos, this.xPos-(i*7), this.yPos-this.bladeLengths[i]);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////// PLANT 
var plant = {};
plant.setup = function(x, y){
	this.type = "plant";
	this.xPos = x; 
	this.yPos = y;
	this.fill = "yellow";
	this.drawStem(x, y);
}
plant.update = function(){
	stroke('#FFE305');
	fill(this.fill);
	this.drawStem(this.xPos, this.yPos);
}
plant.drawStem = function(x, y){
	pLine(x, y, x, y-100);
	pEllipse(x, y-100, 30, 30);
	pEllipse(x, y-115, 20, 20);
	pEllipse(x, y-125, 10, 10);
}

//////////////////////////////////////////////////////////////////////////////////////////// ROCK 
var bush = {};
bush.setup = function(x, y){
	this.type = "bush";
	this.xPos = x; 
	this.yPos = y;
	this.fill = "#FF3047";
	this.stroke = "#CF1734";
	this.width = random(100,150);
	this.height = random(100, 150);
}
bush.update = function(){
	stroke(this.stroke);
	fill(this.fill);
	pEllipse(this.xPos, this.yPos, this.width, this.height, 180, 360);
}

//////////////////////////////////////////////////////////////////////////////////////////// ROCK 
var rock = {};
rock.setup = function(x, y){
	this.type = "rock";
	this.xPos = x; 
	this.yPos = y;
	this.fill = "#8B408F";

	this.sectionCount = random(2,5);
	this.sectionXOffsets = [];
	this.sectionYPoss = [];
	this.sectionHeights = [];
	this.sectionWidths = [];
	for(var i=0; i<this.sectionCount; i++){
		this.sectionXOffsets[i] = random(10,100);
		this.sectionHeights[i] = random(30,100);
		this.sectionWidths[i] = random(40,100);
	}
}
rock.update = function(){
	stroke('purple');
	fill(this.fill);
	for(var i=0; i<this.sectionCount; i++){
		// console.log(this.sectionXOffsets[i], this.sectionYPoss[i], this.sectionWidths[i], this.sectionHeights[i]);
		pEllipse(this.xPos+this.sectionXOffsets[i], this.yPos, this.sectionWidths[i], this.sectionHeights[i], 180, 360);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////// READ/WRITE OBJECTS

var active = 200; 

///////////////////////////////////////////////////////////////////////////////////////// NEW CREATURES
var newCreatures = function(){	
	var objects = [];
	for(var oCount=0; oCount<active; oCount++){
		var chooseLife = random(0,1,false);
		if(chooseLife<0.12){
			var tempDeeb = Object.create(deeb);
			tempDeeb.setup(random(-100,w, false), random(100,h,false), "deeb_"+oCount);
			objects.push( tempDeeb );
		}else if(chooseLife>=0.12 && chooseLife<0.95){
			var tempFlora; 
			var chooseFlora = random(0,1,false);
			if(chooseFlora<0.25){
				tempFlora = Object.create(flower);
			}else if(chooseFlora>=0.25 && chooseFlora<0.4){
				tempFlora = Object.create(plant);
			}else if(chooseFlora>=0.4 && chooseFlora<0.45){
				tempFlora = Object.create(bush);
			}else{
				tempFlora = Object.create(grass);
			}
			tempFlora.setup(random(-100,w), random(0,h,false));
			objects.push( tempFlora );
		}else if(chooseLife>=0.95){
			var tempRock = Object.create(rock);
			tempRock.setup(random(-100,w), random(0,h,false));
			objects.push( tempRock );
		}
	}

	var jsonObject = JSON.stringify(objects);

	$.ajax({
	    dataType : 'json', 
	    url : 'save.php',
	    type : 'POST',
	    success: function(r){
	    	console.log(r);
	    },
	    data : { json:jsonObject }
	});

}
newCreatures();

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


///////////////////////////////////////////////////////////////////////////////////////// READ JSON

var jsonObjects = [];
var myData; 
var xmlObjects = new XMLHttpRequest();
xmlObjects.open('GET', 'assets/creatures.json');
xmlObjects.onreadystatechange = function() {
	if(xmlObjects.readyState==4){ //4 == ready
		myData = JSON.parse(xmlObjects.responseText);
		for(var i=0; i<myData.length; i++){
			if(myData[i].type=="deeb"){
				var tempDeeb = Object.create(deeb);
				tempDeeb.setup(random(0, w, false), random(50, h, false), myData[i].name);
				jsonObjects.push( tempDeeb );
			}else if(myData[i].type=="flower"){
				var tempFlower = Object.create(flower);
				tempFlower.setup(random(0, w, false), myData[i].yPos);
				jsonObjects.push( tempFlower );
			}else if(myData[i].type=="plant"){
				var tempPlant = Object.create(plant);
				tempPlant.setup(random(0, w, false), myData[i].yPos);
				jsonObjects.push( tempPlant );
			}else if(myData[i].type=="grass"){
				var tempGrass = Object.create(grass);
				tempGrass.setup(random(0, w, false), myData[i].yPos);
				jsonObjects.push( tempGrass );
			}else if(myData[i].type=="bush"){
				var tempBush = Object.create(bush);
				tempBush.setup(random(0, w, false), myData[i].yPos);
				jsonObjects.push( tempBush );
			}else if(myData[i].type=="rock"){
				var tempRock = Object.create(rock);
				tempRock.setup(random(0, w, false), myData[i].yPos);
				jsonObjects.push( tempRock );
			}
		}
	}
}
xmlObjects.send();

///////////////////////////////////////////////////////////////////////////////////////// DRAW LOOP


var bgPattern = c.createPattern(textureMarker, "repeat");

var lastPoints = points; 
setInterval(function(){
	fill(bgPattern);
	fRect(0, 0, w, h);
	jsonObjects.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});
	for(var i=0; i<jsonObjects.length; i++){
		if(jsonObjects[i].type == "deeb"){
			//hover over deeb
			if( mouseX > jsonObjects[i].xPos-jsonObjects[i].bodyWidth/2 && mouseX < jsonObjects[i].xPos+jsonObjects[i].bodyWidth/2){
				if(mouseY < jsonObjects[i].yPos && mouseY > jsonObjects[i].yPos-jsonObjects[i].bodyHeight){		
					jsonObjects[i].scared = true;
				}
			}
			if(jsonObjects[i].speed>0){
				if(jsonObjects[i].xPos > width+jsonObjects[i].bodyWidth){
					jsonObjects[i].xPos = -100; 
				}
			}else{
				if(jsonObjects[i].xPos < -100){
					jsonObjects[i].xPos = w+100; 
				}
			}
			jsonObjects[i].pupilSize = 2;
		}
		jsonObjects[i].update();
	}
}, 33);
