/*
* 
* Laurie Waxman
* Thesis 
* 28.03.16
* 
* The land of Flandill. 
* 
* TO DO:
* - new creature?
* - new creature?
* + new plant : bush
* - new plant : spindly thing
* - flies?
* + rocks
* + grass bits
* + save & read from json
* - lemming sounds on death?
* - get days ellapsed
* - add days to realcount
* - compare realcount to cappedcount
* + deeb.points = random_whatever. stage at which it dies, so they don't all die at once
* - landing page w/ choice - yea or nay? <<< hgdeasdfghjkl;;.
* - auto-screen-grabs.
* + only save deebs to json. generate plants each run based on point tally.
* + load certain number of deebs based on tally. 
* + if a deeb dies, keep it dead. no deeb revival. dead deebs even when system is healthy. 
*
* local server: 
* php -S 0.0.0.0:8000 -t .
*
*/

// var thisDeebInfo = document.getElementById('deeb');
// var thisDeebName = document.getElementById('deeb_name');
// var thisDeebHealth = document.getElementById('deeb_health');
// var systemHealth = document.getElementById("system_health");

//#############################################################################################################
//################################################################       ###      ##      ##      ####     ####
//################################################################  ####  ##  ######  ######  ###  #   ########
//################################################################  ####  ##      ##      ##      ###     #####
//################################################################  ####  ##  ######  ######  ###  ######   ###
//################################################################       ###      ##      ##      ###     #####
//#############################################################################################################
// ^ so I can see this shit in the thumbnail.

var dFills = getDeebFills(points);
var dStroke = getDeebStroke(points);

var ddFills = getDeadDeebFills();
var ddStroke = "hsla(180,10%,80%,0.2)";

var deeb = {};
deeb.init = function(x, y, c){
	this.type = "deeb";
	this.index = c; 
	this.xPos = x; 
	this.yPos = y;
	this.state = 1;
	this.name = "debby";
	this.bodyWidth = random(100, 150); 
	this.bodyHeight = 130+random(-10, 20);
	this.points = random(0, this.bodyWidth*0.2);
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
}
deeb.setup = function(x, y, n, p, bw, bh, s, sp, c){
	this.type = "deeb";
	this.points = p;
	this.index = c; 
	this.xPos = x; 
	this.yPos = y;
	this.name = n;
	this.state = s;
	this.bodyWidth = bw;
	this.bodyHeight = bh;
	this.scared = false;
	this.scaredCount = 0;
	this.fill = dFills[0];
	this.bFill = dFills[1];
	this.stroke = dStroke;
	// map(points, 0, 200, 1, 4);
	this.speed = random(map(points, 0, 200, 1, 3), map(points, 0, 200, 1, 3)+1, false);
	if(random(0,1)<1){ this.speed=-this.speed; }
	if(points<=this.points || this.state == 0){ 
		this.state = 0; 
	}
	this.eyeSize = random(20,30, false);
	this.mouthWidth = random(5,15);
	this.startHeight = this.bodyHeight;
	this.slugCount = random(0,10,false);
	this.slugPeriod = random(40,70);
	this.drawBody(x, y);
}
deeb.update = function(){
	if( mouseX > this.xPos-this.bodyWidth/2 && mouseX < this.xPos+this.bodyWidth/2 && mouseY < this.yPos && mouseY > this.yPos-this.bodyHeight){	
		this.scared = true;
		thisDeebInfo.style.opacity = '1';
		thisDeebName.innerHTML = this.name;
		if(this.state == 0){
			thisDeebHealth.innerHTML = "deceased"; 
		}else if( (points-this.points)>100 ){
			thisDeebHealth.innerHTML = "100%";
		}else{
			thisDeebHealth.innerHTML = (points-this.points) +"%";
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
}
deeb.drawBody = function(x, y){
	var bodyW = this.bodyWidth + map(points, 0, 200, -75, 50);
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
}
deeb.face = function(){

	this.pupilSize = 2;

	var eyeSize = map(points, 0, 150, this.eyeSize*0.6, this.eyeSize);
	var eyeMinH = this.bodyHeight*0.75; 
	var eyeMaxH = this.bodyHeight*0.95;
	var eyeHeight = Math.max(eyeMinH, Math.min(map(points, 0, 100, eyeMinH, eyeMaxH), eyeMaxH));
	var mouthOpen = map(points, 0, 200, -20, 20);
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
	if(this.state!=0){	
		if(mouthOpen>-5 && mouthOpen<5){
			pLine(this.xPos-this.mouthWidth, this.yPos-eyeHeight+20, this.xPos+this.mouthWidth, this.yPos-eyeHeight+20);
		}else{
			pEllipse(this.xPos, this.yPos-eyeHeight+20, this.mouthWidth*2, mouthOpen, 0, 180);
		}
	}
}


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
	this.width = 30; 
	this.height = 135;
	this.loop = 0; 

	this.images = [];
	tempCanvas.width = this.width;
	tempCanvas.height = this.height;
	setCanvas(tempC);
	for(var i=0; i<1; i++){
		this.draw();
		this.images[i] = new Image;
		this.images[i].src = tempCanvas.toDataURL();
	}
	resetCanvas();
}
plant.draw = function(){
	stroke('#FFE305');
	fill(this.fill);
	pLine(this.width/2, this.height, this.width/2, this.height-100);
	pEllipse(this.width/2, this.height-100, 30, 30);
	pEllipse(this.width/2, this.height-115, 20, 20);
	pEllipse(this.width/2, this.height-125, 10, 10);
}
plant.update = function(){
	this.loop++;
	if(this.loop>=1) this.loop = 0; 
	c.drawImage(this.images[this.loop], this.xPos, this.yPos-this.height);
}
//////////////////////////////////////////////////////////////////////////////////////////// ROCK 

var bush = {};
bush.setup = function(x, y){
	this.type = "bush";
	this.xPos = x; 
	this.yPos = y;
	this.loop = 0; 
	this.fill = "#FF3047";
	this.stroke = "#FF8C8F";//"#CF1734";
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
}
bush.draw = function(){
	background();
	stroke(this.stroke);
	fill(this.fill);
	pEllipse(this.width/2, this.height, this.width-2, this.height, 180, 360);
}
bush.update = function(){
	this.loop++;
	if(this.loop>=3) this.loop = 0; 
	c.drawImage(this.images[this.loop], this.xPos, this.yPos-this.height);
}

//////////////////////////////////////////////////////////////////////////////////////////// ROCK 
var rock = {};
rock.setup = function(x, y){
	this.type = "rock";
	this.xPos = x; 
	this.yPos = y;
	this.fill = "#8B408F";
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
}
rock.draw = function(){
	stroke('purple');
	fill(this.fill);
	for(var i=0; i<this.sectionCount; i++){
		pEllipse(this.sectionXOffsets[i], this.height, this.sectionWidths[i], this.sectionHeights[i], 180, 360);
	}
}
rock.update = function(){
	this.loop++;
	if(this.loop>=3) this.loop = 0; 
	c.drawImage(this.images[0], this.xPos, this.yPos-this.height);
}

//#############################################################################################################
//###############################################    ####      ####     ###      ###     ##        ###     ####
//#############################################  ####  ##  ###   #####  ###  ######  #########  ####   ########
//#############################################  ####  ##      #######  ###      ##  #########  #####     #####
//#############################################  ####  ##  ###   #####  ###  ######  #########  #########   ###
//##############################################     ####      ###     ####      ##      #####  #####     #####
//#############################################################################################################

////////////////////////////////////////////////////////////////////////////////////////// NEW CREATURES

var newData = function(){	
	var total = 200; 
	var objects = [];
	for(var oCount=0; oCount<total; oCount++){
		var tempDeeb = Object.create(deeb);
		tempDeeb.init(random(-100,w, false), random(100,h,false), oCount);
		objects.push( tempDeeb );
	}

	var today = new Date();

	var system = {};
	system.points = 100;
	system.deebsAlive = 200; 
	system.deebsDead = 0; 
	system.visitors = 0; 
	system.lastVisit = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

	var fullFile = {};
	fullFile.info = system; 
	fullFile.critters = objects; 

	var jsonObject = JSON.stringify(fullFile);

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
// newData();


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

var jsonObjects = []; //array of all deebs from file
var deebs = []; //array of deebs to draw
var critterArray = []; //array of all critters to draw


var xmlObjects = new XMLHttpRequest();
xmlObjects.open('GET', 'assets/creatures.json');
xmlObjects.onreadystatechange = function() {
	if(xmlObjects.readyState==4){ //4 == ready

		var density = Math.round( (w*h/22500) );
		var rockCount = Math.round( density*0.2 );  
		var flowerCount = Math.round( density*map(points, 0, 200, 0.3, 0.8) );
		var plantCount = Math.round( flowerCount*0.8 );  
		var bushCount = Math.round( density*map(points, 0, 200, 0.2, 0.4) );
		var deebCount = Math.round( density*map(points, 0, 200, 0.2, 0.6) );  

		var myData = JSON.parse(xmlObjects.responseText);
		var myDeebs = myData.critters; 
		// systemInfo = myData.info;
		// points = systemInfo.points;

		for(var i=0; i<myDeebs.length; i++){
			var tempDeeb = Object.create(deeb);
			tempDeeb.setup(random(0, w, false), random(100, h, false), myDeebs[i].name, myDeebs[i].points, myDeebs[i].bodyWidth, myDeebs[i].bodyHeight, myDeebs[i].state, myDeebs[i].speed, myDeebs[i].index);
			jsonObjects.push( tempDeeb );
		}
		for(var j=0; j<deebCount; j++){
			var rand = random(0, jsonObjects.length-1); 
			critterArray.push( jsonObjects[rand] );
		}
		for(var b=0; b<bushCount; b++){
			tempBush = Object.create(bush);
			tempBush.setup(random(0, w, false), random(0, h, false));
			critterArray.push( tempBush );
		}
		for(var f=0; f<flowerCount; f++){
			var tempFlower = Object.create(flower);
			tempFlower.setup(random(0, w, false), random(0, h, false));
			critterArray.push( tempFlower );
		}
		for(var p=0; p<plantCount; p++){
			var tempPlant = Object.create(plant);
			tempPlant.setup(random(0, w, false), random(0, h, false));
			critterArray.push( tempPlant );
		}
		for(var r=0; r<rockCount; r++){
			var tempRock = Object.create(rock);
			tempRock.setup(random(0, w, false), random(0, h, false));
			critterArray.push( tempRock );
		}
	}
}
xmlObjects.send();


//#############################################################################################################
//#############################################  ###  ##      ###      ###       ##        ##      ###     ####
//#############################################  ###  ##  ###   #  ###  ##  ###  #####  #####  #####   ########
//#############################################  ###  ##      ###  ###  ##       #####  #####      ##     #####
//#############################################  ###  ##  #######  ###  ##  ###  #####  #####  ##########   ###
//##############################################     ###  #######      ###  ###  #####  #####      ##     #####
//#############################################################################################################
// update loop. where animation happens (sort of).
// draws background, sorts to draw order & draws. 

setInterval(function(){
	fill(bgPattern);
	fRect(0, 0, w, h);
	critterArray.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});
	for(var i=0; i<critterArray.length; i++){
		critterArray[i].update();
	}
}, 33);

///////////////////////////////////////////////////////////////////////////////////////// SAVE STATE
// copies deebs back to their index in the full deeb array. 
// if system is dead, kill all deebs, not just those active.
// saves to server.

window.onbeforeunload = function(){
	if(points == 0){
		for(var i=0; i<jsonObjects.length; i++){
			jsonObjects[i].state = 0; 
		}
	}
	for(var q=0; q<critterArray.length; q++){
		if(critterArray[q].type == "deeb"){
			var thisIndex = critterArray[q].index;
			jsonObjects[ thisIndex ] = critterArray[q];
		}
	}

	var fullFile = {};
	fullFile.info = systemInfo; 
	fullFile.critters = jsonObjects; 

	$.ajax({
	    dataType : 'json', 
	    async : false,
	    url : 'save.php',
	    type : 'POST',
	    success: function(r){
	    	console.log(r);
	    },
	    data : { json:JSON.stringify(fullFile) }
	});
	return null;
}
