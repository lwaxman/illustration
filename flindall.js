/*
* 
* Laurie Waxman
* Thesis 
* 06.03.16
* 
* The land of Flindall. 
* 
* TO DO:
* - new fauna
* - new fauna
* - new flora
* - new flora
* - new flora
* - flies
* + grass bits
* - save & read from json
*
*/

var scale = 1.5;
var points = 0;
if(points>200){ points=200; }
else if(points<0){ points=0; }

// get days ellapsed
// add days to realcount
// compare realcount to cappedcount

/////////////////////////////////////////////////////////////////////////////////////////////////// SETUP

////////////////////////////////////////////////////////////////////////////////////// BACKGROUND

var setBackgroundColour = function(){
	var saturation = map(points, 0, 200, 10, 60);
	var bgColour = "hsla(290,"+saturation+"%,50%,1)";
	// console.log()
	document.body.style.background = bgColour; //"hsla(305,100%,50%,1)";
	// document.body.style.background = "#f00";
}
setBackgroundColour();

/////////////////////////////////////////////////////////////////////////////////////////////////// FAUNA
//////////////////////////////////////////////////////////////////////////////////////////// DEEBS

var deeb = {};
deeb.setup = function(x, y){
	this.type = "deeb";
	this.xPos = x; 
	this.yPos = y;
	this.bodyWidth = 40+(points*0.75)+random(-20, 20); 
	this.bodyHeight = 130+random(-10, 20);

	this.scared = false;
	this.scaredCount = 0;

	this.fill = "#DEEBEE";
	this.bFill = "#d3e4e8";

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
	if(points==0){
		this.speed=0;
		this.bFill="#eee"
		this.fill="#fff";
	}else{
		if(points>0 && points<=20){
			this.fill = "#fff";
			this.bFill = "#f4f9fa";
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
	fill(this.fill);
	pEllipse(x, y-this.bodyHeight+(this.bodyWidth/2), this.bodyWidth, this.bodyWidth, 179, 360);
	fill(this.bFill);
	fEllipse(x, y-this.bodyHeight+(this.bodyWidth/2), this.bodyWidth*0.8, this.bodyWidth*0.9, 179, 360);
	
	// y-2 to cover up gap at 360˚
	fill(this.fill);
	fRect(x-(this.bodyWidth/2), y-this.bodyHeight+(this.bodyWidth/2)-2, this.bodyWidth, this.bodyHeight-(this.bodyWidth/2));
	fill(this.bFill);
	fRect(x-(this.bodyWidth*0.8/2), y-this.bodyHeight+(this.bodyWidth/2)-2, this.bodyWidth*0.8, this.bodyHeight-(this.bodyWidth/2));

	pLine(x-(this.bodyWidth/2), y-this.bodyHeight+(this.bodyWidth/2)-2, x-(this.bodyWidth/2), y);
	pLine(x+(this.bodyWidth/2), y-this.bodyHeight+(this.bodyWidth/2)-2, x+(this.bodyWidth/2), y);
	pLine(x-(this.bodyWidth/2), y, x+(this.bodyWidth/2), y);
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
		pEllipse(this.xPos-(10*i), this.yPos-eyeHeight, eyeSize, eyeSize);
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
	if(mouthOpen>-5 && mouthOpen<5){
		pLine(this.xPos-this.mouthWidth, this.yPos-eyeHeight+20, this.xPos+this.mouthWidth, this.yPos-eyeHeight+20);
	}else{
		pEllipse(this.xPos, this.yPos-eyeHeight+20, this.mouthWidth*2, mouthOpen, 0, 180);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////// ???

/////////////////////////////////////////////////////////////////////////////////////////////////// FLORA

//////////////////////////////////////////////////////////////////////////////////////////// FLOWER

var flower = {};
flower.setup = function(x, y){
	this.type = "flower";
	this.xPos = x; 
	this.yPos = y;
	this.hue = 360+random(-20,20);
	this.brightness = random(30, 50);
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
	fill(this.fill);
	for(var i=0; i<this.flowerCount; i++){
		this.drawStem(this.xPos, this.yPos, this.xPos+this.stemOffsets[i], this.yPos-this.stemLengths[i], this.flowerSizes[i]);
	}
}
flower.drawStem = function(x1, y1, x2, y2, r){
	pLine(x1, y1, x2, y2);
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
	fill(this.fill);
	this.drawStem(this.xPos, this.yPos);
}
plant.drawStem = function(x, y){
	pLine(x, y, x, y-100);
	pEllipse(x, y-100, 30, 30);
	pEllipse(x, y-115, 20, 20);
	pEllipse(x, y-125, 10, 10);
}

/////////////////////////////////////////////////////////////////////////////////////////////////// OBJECTS

var activeDeebs = 100; 

var objects = [];
for(var oCount=activeDeebs; oCount>0; oCount--){
	var chooseLife = random(0,1,false);
	if(chooseLife<0.30){
		var tempDeeb = Object.create(deeb);
		tempDeeb.setup(random(-100,w), random(0,h,false));
		objects.push( tempDeeb );
	}else if(chooseLife>=0.30){
		var tempFlora; 
		var chooseFlora = random(0,1,false);
		if(chooseFlora<0.3){
			tempFlora = Object.create(flower);
		}else if(chooseFlora>=0.3 && chooseFlora<0.5){
			tempFlora = Object.create(plant);
		}else{
			tempFlora = Object.create(grass);
		}
		tempFlora.setup(random(-100,w), random(0,h,false));
		objects.push( tempFlora );
	}
}

var jsonString = JSON.stringify(objects);
console.log(jsonString);

var cursorX = 0;
var cursorY = 0;
document.onmousemove = function(e){
	cursorX = e.clientX;
	cursorY = e.clientY;
}

setInterval(function(){
	if(points<=0) points = 0;
	background();
	objects.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});

	for(var i=0; i<objects.length; i++){
		if(objects[i].type == "deeb"){
			//hover over deeb
			if( cursorX > objects[i].xPos-objects[i].bodyWidth/2 && cursorX < objects[i].xPos+objects[i].bodyWidth/2){
				if(cursorY < objects[i].yPos && cursorY > objects[i].yPos-objects[i].bodyHeight){		
					objects[i].scared = true;
				}
			}
		}

		if(objects[i].speed != undefined){	
			// console.log(objects[i].speed);
			if(objects[i].speed>0){
				if(objects[i].xPos > width+objects[i].bodyWidth){
					objects[i].xPos = -100; 
				}
			}else{
				if(objects[i].xPos < -100){
					objects[i].xPos = w+100; 
				}
			}
			objects[i].pupilSize = 2;
		}
		objects[i].update();
	}
}, 33);

