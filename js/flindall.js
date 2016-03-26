/*
* 
* Laurie Waxman
* Thesis 
* 06.03.16
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
* ~ save & read from json
* - lemming sounds on death?
* - get days ellapsed
* - add days to realcount
* - compare realcount to cappedcount
* + deeb.points = random_whatever. stage at which it dies, so they don't all die at once
* - landing page w/ choice - yea or nay? <<< hgdeasdfghjkl;;.
* - auto-screen-grabs.
*
* + only save deebs to json. generate plants each run based on point tally.
* + load certain number of deebs based on tally. 
*
* - if a deeb dies, keep it dead. no deeb revival. dead deebs even when system is healthy. 
*
* local server: 
* php -S 0.0.0.0:8000 -t .
*
*/

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
deeb.setup = function(x, y, n, p, bw, bh, s, sp){
	this.type = "deeb";
	this.points = p; 
	this.xPos = x; 
	this.yPos = y;
	this.name = n;
	console.log(this.name);
	this.state = s;
	this.bodyWidth = bw;//+ map(points, 0, 200, -75, 50); 
	this.bodyHeight = bh;
	this.scared = false;
	this.scaredCount = 0;
	this.fill = dFills[0];
	this.bFill = dFills[1];
	this.stroke = dStroke;
	this.speed = random(3, 4.5, false);
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
	if(this.state == 0){
		this.speed=0;
	}else{
		this.slugCount++;
		this.xPos+=this.speed;
		var amplitude = 7;
		var y = Math.sin( (this.slugCount/this.slugPeriod*2*Math.PI)+Math.PI ) * amplitude;
		this.bodyHeight = this.startHeight+y;
	}
	this.drawBody(this.xPos, this.yPos);
}
deeb.drawBody = function(x, y){
	//round
	fill(this.bFill);
	stroke(this.stroke);
	pEllipse(x, y-this.bodyHeight+(this.bodyWidth/2), this.bodyWidth, this.bodyWidth, 179, 360);
	fill(this.fill);
	fEllipse(x, y-this.bodyHeight+(this.bodyWidth/2), this.bodyWidth*0.8, this.bodyWidth*0.9, 179, 360);
	//main body
	fill(this.bFill);
	fRect(x-(this.bodyWidth/2), y-this.bodyHeight+(this.bodyWidth/2)-2, this.bodyWidth, this.bodyHeight-(this.bodyWidth/2));
	fill(this.fill);
	fRect(x-(this.bodyWidth*0.8/2), y-this.bodyHeight+(this.bodyWidth/2)-2, this.bodyWidth*0.8, this.bodyHeight-(this.bodyWidth/2));
	//outline
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

var newCreatures = function(){	
	var total = 200; 
	var objects = [];
	for(var oCount=0; oCount<total; oCount++){
		// var chooseLife = random(0,1,false);
		// if(chooseLife<0.12){
		var tempDeeb = Object.create(deeb);
		tempDeeb.init(random(-100,w, false), random(100,h,false), oCount);
		objects.push( tempDeeb );
		// }else if(chooseLife>=0.12 && chooseLife<0.95){
		// 	var tempFlora; 
		// 	var chooseFlora = random(0,1,false);
		// 	if(chooseFlora<0.25){
		// 		tempFlora = Object.create(flower);
		// 	}else if(chooseFlora>=0.25 && chooseFlora<0.4){
		// 		tempFlora = Object.create(plant);
		// 	}else if(chooseFlora>=0.4 && chooseFlora<0.45){
		// 		tempFlora = Object.create(bush);
		// 	}else{
		// 		tempFlora = Object.create(grass);
		// 	}
		// 	tempFlora.setup(random(-100,w), random(0,h,false));
		// 	objects.push( tempFlora );
		// }else if(chooseLife>=0.95){
		// 	var tempRock = Object.create(rock);
		// 	tempRock.setup(random(-100,w), random(0,h,false));
		// 	objects.push( tempRock );
		// }
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
// newCreatures();


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

///////////////////////////////////////////////////////////////////////////////////////// COUNT OBJECTS

var density = (w*h/22500);

var countDeebs = function(){
	return density*0.5; 
}

var countFlowers_yellow = function(){

}

var countFlowers_red = function(){

}

///////////////////////////////////////////////////////////////////////////////////////// READ JSON

var deebsActive = countDeebs();

var d = [];
var deebs = [];
var jsonObjects = []; //array of deebs
var myData; //deebs from file
var xmlObjects = new XMLHttpRequest();
xmlObjects.open('GET', 'assets/creatures.json');
xmlObjects.onreadystatechange = function() {
	if(xmlObjects.readyState==4){ //4 == ready
		myData = JSON.parse(xmlObjects.responseText);
		for(var i=0; i<myData.length; i++){
			// if(myData[i].type=="deeb"){
				var tempDeeb = Object.create(deeb);
				tempDeeb.setup(random(0, w, false), random(100, h, false), myData[i].name, myData[i].points, myData[i].bodyWidth, myData[i].bodyHeight, myData[i].state, myData[i].speed);
				// console.log("json", myData[i].state);
				jsonObjects.push( tempDeeb );
			// }else if(myData[i].type=="flower"){
			// 	var tempFlower = Object.create(flower);
			// 	tempFlower.setup(random(0, w, false), myData[i].yPos);
			// 	jsonObjects.push( tempFlower );
			// }else if(myData[i].type=="plant"){
			// 	var tempPlant = Object.create(plant);
			// 	tempPlant.setup(random(0, w, false), myData[i].yPos);
			// 	jsonObjects.push( tempPlant );
			// }else if(myData[i].type=="grass"){
			// 	var tempGrass = Object.create(grass);
			// 	tempGrass.setup(random(0, w, false), myData[i].yPos);
			// 	jsonObjects.push( tempGrass );
			// }else if(myData[i].type=="bush"){
			// 	var tempBush = Object.create(bush);
			// 	tempBush.setup(random(0, w, false), myData[i].yPos);
			// 	jsonObjects.push( tempBush );
			// }else if(myData[i].type=="rock"){
			// 	var tempRock = Object.create(rock);
			// 	tempRock.setup(random(0, w, false), myData[i].yPos);
			// 	jsonObjects.push( tempRock );
			// }
		}
		for(var j=0; j<deebsActive; j++){
			var rand = random(0, jsonObjects.length-1); 
			// console.log( jsonObjects[rand] );
			deebs.push( jsonObjects[rand] );
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

var thisDeebName = document.getElementById('deeb_name');
// console.log(thisDeebName.innerHTML); //= "xander";

var thisDeebSpeed = document.getElementById('deeb_speed');
// console.log(thisDeebSpeed.innerHTML); //= "xander";

setInterval(function(){
	fill(bgPattern);
	fRect(0, 0, w, h);
	deebs.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});
	for(var i=0; i<deebsActive; i++){
		if(deebs[i].type == "deeb"){
			//hover over deeb
			if( mouseX > deebs[i].xPos-deebs[i].bodyWidth/2 && mouseX < deebs[i].xPos+deebs[i].bodyWidth/2){
				if(mouseY < deebs[i].yPos && mouseY > deebs[i].yPos-deebs[i].bodyHeight){		
					deebs[i].scared = true;
					thisDeebName.innerHTML = deebs[i].name;
				}
			}
			//reset positions
			if(deebs[i].speed>0){
				if(deebs[i].xPos > width+deebs[i].bodyWidth){
					deebs[i].xPos = -100; 
					deebs[i].yPos = random(100, h-100); 
				}
			}else{
				if(deebs[i].xPos < -100){
					deebs[i].xPos = w+100; 
					deebs[i].yPos = random(100, h-100); 
				}
			}
			deebs[i].pupilSize = 2;
		}
		deebs[i].update();
	}
	if(points == 0){
		for(var i=0; i<jsonObjects.length; i++){
			jsonObjects[i].state = 0; 
		}
	}
}, 33);


///////////////////////////////////////////////////////////////////////////////////////// SAVE STATE

window.onbeforeunload = function(){
	for(var q=0; q<deebs.length; q++){
		var thisIndex = deebs[q].index;
		jsonObjects[ thisIndex ] = deebs[q];
	}
	for(var i=0; i<jsonObjects.length; i++){
		jsonObjects[i].speed = 0; 
	}
   	// var newObject = JSON.stringify(jsonObjects);
	$.ajax({
	    dataType : 'json', 
	    async : false,
	    url : 'save.php',
	    type : 'POST',
	    success: function(r){
	    	console.log(r);
	    },
	    data : { json:JSON.stringify(jsonObjects) }
	});
   return null;
}
