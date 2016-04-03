/*
* 
* Laurie Waxman
* Thesis 
* 28.03.16
* 
* The land of Flandill. 
* 
* TO DO:
* + new plant : bush
* + rocks
* + grass bits
* + save & read from json
* + get days ellapsed
* + deeb.points = random_whatever. stage at which it dies, so they don't all die at once
* + landing page
* + auto-screen-grabs.
* + only save deebs to json. generate plants each run based on point tally.
* + load certain number of deebs based on tally. 
* + if a deeb dies, keep it dead. no deeb revival. dead deebs even when system is healthy. 
* + only save every few images so as not to totaly kill my server space/make the 
* - new plant : spindly thing
* - lemming sounds on death?
* - spawn new deebs
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

var dFills = [];
var dStroke;
var ddFills = [];
var ddStroke;

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
	this.speed = random(map(points, 400, 0, 1, 3), map(points, 400, 0, 1, 5)+1, false);
	if(random(0,1)<1){ this.speed=-this.speed; }
	if((400-points)<=this.points || this.state == 0){ 
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
	var bodyW = this.bodyWidth + map(points, 400, 0, -75, 50);
	if(this.state==0) bodyW = this.bodyWidth + map(this.points, 0, 200, -75, 50);
	if( mouseX > this.xPos-bodyW/2 && mouseX < this.xPos+bodyW/2 && mouseY < this.yPos && mouseY > this.yPos-this.bodyHeight){	
		thisDeebInfo.style.opacity = '1';
		thisDeebName.innerHTML = this.name;
		this.scared = true;
		if(this.state == 0){
			thisDeebHealth.innerHTML = "R.I.P."; 
		}else if( (points-this.points)<=200 ){
			thisDeebHealth.innerHTML = "100%";
		}else{
			thisDeebHealth.innerHTML = this.points/4+"%";
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
}
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
			setTimeout(function(){
				thisDeebInfo.style.opacity = '0';
			}, 3000);
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

//////////////////////////////////////////////////////////////////////////////////////////// PLANT 
var plant = {};
plant.setup = function(x, y){
	this.type = "plant";
	this.xPos = x; 
	this.yPos = y;
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
}
plant.draw = function(){
	stroke(this.stroke);
	fill(this.fill);
	pLine(this.width/2, this.height, this.width/2, this.height-100);
	pEllipse(this.width/2, this.height-(this.height-35), 30, 30);
	pEllipse(this.width/2, this.height-(this.height-20), 20, 20);
	pEllipse(this.width/2, this.height-(this.height-8), 10, 10);
}
plant.update = function(){
	this.loop++;
	if(this.loop>=3) this.loop = 0; 
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

	var bri = map(points, 200, 400, 60, 20);
	var sat = map(points, 200, 400, 100, 80);
	if(points<=200){ bri = 60; sat = 100; }
	else if(points>=400){ bri = 20; sat = 80; }
	this.fill = "hsla(353, "+sat+"%, "+bri+"%, 1)";
	this.stroke =  "hsla(358, "+sat+"%, "+(bri+10)+"%, 1)";

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

//////////////////////////////////////////////////////////////////////////////////////////// GRASS 
var grass = {};
grass.setup = function(x, y){
	this.type = "grass";
	this.xPos = x; 
	this.yPos = y;
	this.bladeCount = random(2,5);
	this.bladeLengths = [];
	for(var i=0; i<this.bladeCount; i++){
		this.bladeLengths[i] = random(5,20);
	}
}
grass.update = function(){
	stroke('purple');
	for(var i=0; i<this.bladeCount; i++){
		pLine(this.xPos-(i*7), this.yPos, this.xPos-(i*7), this.yPos-this.bladeLengths[i]);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////// ROCK 
var rock = {};
rock.setup = function(x, y){
	this.type = "rock";
	this.xPos = x; 
	this.yPos = y;
	this.fill = "#8B408F";

	var sat = map(points, 200, 400, 65, 10);
	var bri = map(points, 200, 400, 45, 45);
	if(points<=200){ sat = 65; bri = 45; }
	else if(points>=400){ sat = 10; bri = 45; }
	console.log(sat, bri);
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
}
rock.draw = function(){
	stroke(this.stroke);
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
//##########  ####  ##      ##  #######  ########    ####      ####     ###      ###     ##        ###     ####
//##########    ##  ##  ######  ##   ##  ######  ####  ##  ###   #####  ###  ######  #########  ####   ########
//##########  #  #  ##      ##  #  #  #  ######  ####  ##      #######  ###      ##  #########  #####     #####
//##########  ##    ##  ######    ###    ######  ####  ##  ###   #####  ###  ######  #########  #########   ###
//##########  ####  ##      ##  #######  #######     ####      ###     ####      ##      #####  #####     #####
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
	system.lastArchive = 0; 
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

//#############################################################################################################
//###########################################################################  ####     ####     ###  ####  ###
//###########################################################################  ##   #######  ###  ##    ##  ###
//###########################################################################  ###     ####  ###  ##  #  #  ###
//######################################################################  ###  #######   ##  ###  ##  ##    ###
//#######################################################################     ####     #####     ###  ####  ###
//#############################################################################################################

//////////////////////////////////////////////////////////////////////////////////// HTTP REQUEST DEEB DATA

var readJSON = function(){
	var xmlObjects = new XMLHttpRequest();
	xmlObjects.open('GET', 'assets/creatures.json');
	xmlObjects.onreadystatechange = function() {
		if(xmlObjects.readyState==4){ //4 == ready

			var myData = JSON.parse(xmlObjects.responseText);
			myDeebs = myData.critters; 
			systemInfo = myData.info;

			var today = new Date();
			var visited = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
			var lastVisited = systemInfo.lastVisit;
			var days = daysEllapsed( parseDate(visited), parseDate(lastVisited)); 
			console.log(systemInfo.lastArchive);

			systemInfo.points = 100; 

			// days = 30;
			systemInfo.lastArchive += days+1; 

			points = systemInfo.points;
			if(points<0) points = 0; 
			else if(points>400) points = 400; 


			if(runCount == 0){
				var archCount = Math.floor(systemInfo.lastArchive/10);
				makeArchive(archCount, systemInfo.points);				
				runCount++;
			}
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			w = window.innerWidth;
			h = window.innerHeight;

			systemInfo.visitors += 1; 
			systemInfo.points += days*2;
			systemHealth.innerText = systemInfo.points; 
			systemVisitors.innerText = systemInfo.visitors; 
			systemLastVisited.innerText = days;

			dFills = getDeebFills(systemInfo.points);
			dStroke = getDeebStroke(systemInfo.points);
			ddFills = getDeadDeebFills();
			ddStroke = "hsla(180,10%,80%,0.2)";
			bgPattern = backgroundPattern(systemInfo.points);
			
			if(systemInfo.points<=0) systemInfo.points=0; 
			
			createObjectArray(systemInfo.points, myDeebs);

			systemInfo.lastVisit = visited;
			systemInfo.deebsDead = deadCount;
			systemDeadDeebs.innerHTML = deadCount;
			systemYourFault.innerHTML = deadCount - systemInfo.deebsDead; 
		}
	}
	xmlObjects.send();
}
readJSON();


///////////////////////////////////////////////////////////////////////////// DRAW IMAGES

var l=0;
var makeArchive = function(arcCount, p){
	canvas.width = 800; 
	canvas.height = 800; 
	w = 800; 
	h = 800;
	if(l<arcCount){
		console.log("archiving", l, "of", arcCount);
		p -= 20;
		// systemInfo.points -= 20; 
		// console.log(systemInfo.points);
		dFills = getDeebFills(p);
		dStroke = getDeebStroke(p);
		ddFills = getDeadDeebFills();
		ddStroke = "hsla(180,10%,80%,0.2)";
		bgPattern = backgroundPattern(p);
		createObjectArray(p, myDeebs);
		drawCanvas();
		var dataURL = canvas.toDataURL();
		var tempImg = new Image();
		tempImg.onload = function(){
			myImages.push( tempImg.src );
			if(myImages.length>=arcCount){
				saveImages(myImages);
			}
		}
		tempImg.src = dataURL;
		jsonObjects = []; 
		deebs = [];
		critterArray = []; 
		l++;
		systemInfo.lastArchive -= 10; 
		if(systemInfo.lastArchive <= 0) systemInfo.lastArchive = 0; 
		makeArchive(arcCount, p);	
	}
}


///////////////////////////////////////////////////////////////////////////// SAVE IMAGES TO FILE

var saveImages = function(imgs){
	console.log(imgs);
	var tempString = "";
	for(var i=0; i<imgs.length; i++){
		tempString += imgs[i]+"> ";
	}
	$.ajax({
		dataType : 'text', 
		url : 'saveImages.php',
		type : 'POST',
		success: function(r){
			console.log(r);
		},
		data : { urls:tempString }
	}).done(function(){
		console.log("images saved");
	});
}

/////////////////////////////////////////////////////////////////////////////// CREATE OBJECTS FROM ARRAY

var deadCount;
var createObjectArray = function(p, dbs){
	var density = Math.round( (w*h/22500) );
	var rockCount = Math.round( density*0.2 );  
	var grassCount = Math.round( density*0.8 );  
	var flowerCount = Math.round( density*map(p, 400, 0, 0.3, 1.5) );
	var plantCount = Math.round( flowerCount*0.8 );  
	var bushCount = Math.round( density*map(p, 400, 0, 0.2, 0.6) );
	var deebCount = Math.round( density*map(p, 400, 0, 0.2, 0.6) ); 
	if(p>400){
		rockCount = Math.round( density*0.2 );  
		grassCount = Math.round( density*0.8 );  
		flowerCount = Math.round( density*map(p, 400, 800, 0.3, 0.05) );
		plantCount = Math.round( flowerCount*0.8 );  
		bushCount = Math.round( density*map(p, 400, 800, 0.2, 0.05) );
	}	
	deadCount = 0; 
	for(var i=0; i<dbs.length; i++){
		var tempDeeb = Object.create(deeb);
		tempDeeb.setup(random(0, w, false), random(100, h, false), dbs[i].name, dbs[i].points, dbs[i].bodyWidth, dbs[i].bodyHeight, dbs[i].state, dbs[i].speed, dbs[i].index);
		if(tempDeeb.state == 0){
			deadCount++;
		}
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
	for(var g=0; g<grassCount; g++){
		var tempGrass = Object.create(grass);
		tempGrass.setup(random(0, w, false), random(0, h, false));
		critterArray.push( tempGrass );
	}
}

window.onresize = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	w = window.innerWidth;
	h = window.innerHeight;
	jsonObjects = []; 
	deebs = [];
	critterArray = []; 
	readJSON();
}


//#############################################################################################################
//#############################################  ###  ##      ###      ###       ##        ##      ###     ####
//#############################################  ###  ##  ###   #  ###  ##  ###  #####  #####  #####   ########
//#############################################  ###  ##      ###  ###  ##       #####  #####      ##     #####
//#############################################  ###  ##  #######  ###  ##  ###  #####  #####  ##########   ###
//##############################################     ###  #######      ###  ###  #####  #####      ##     #####
//#############################################################################################################
// update loop. where animation happens (sort of).
// draws background, sorts to draw order & draws. 

var drawCanvas = function(){
	// console.log("draw",critterArray);
	fill(bgPattern);
	fRect(0, 0, w, h);
	critterArray.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});
	for(var i=0; i<critterArray.length; i++){
		critterArray[i].update();
	}
}

setInterval(function(){
	drawCanvas();
}, 33);

///////////////////////////////////////////////////////////////////////////////////////// SAVE STATE
// copies deebs back to their index in the full deeb array. 
// if system is dead, kill all deebs, not just those active.
// saves to server.

window.onbeforeunload = function(){
	// if(points >= 400){
	// 	for(var i=0; i<jsonObjects.length; i++){
	// 		jsonObjects[i].state = 0; 
	// 	}
	// }
	// for(var q=0; q<critterArray.length; q++){
	// 	if(critterArray[q].type == "deeb"){
	// 		var thisIndex = critterArray[q].index;
	// 		jsonObjects[ thisIndex ] = critterArray[q];
	// 	}
	// }	
	// var fullFile = {};
	// fullFile.info = systemInfo; 
	// fullFile.critters = jsonObjects; 
	// $.ajax({
	// 	dataType : 'json', 
	// 	async : false,
	// 	url : 'save.php',
	// 	type : 'POST',
	// 	success: function(r){
	// 		console.log(r);
	// 	},
	// 	data : { json:JSON.stringify(fullFile) }
	// });
	// return null;
}
