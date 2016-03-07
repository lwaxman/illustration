/*
* 
* Laurie Waxman
* Thesis 
* 06.03.16
* 
* The land of Flindall. 
* 
*/

var scale = 1.5;
var points = 100;

/////////////////////////////////////////////////////////////////////////////////////////////////// FAUNA
//////////////////////////////////////////////////////////////////////////////////////////// DEEBS

var deeb = {};
deeb.count = 0; 
deeb.xPos = 0;
deeb.yPos = 0;
deeb.bodyWidth = 100; 
deeb.bodyHeight = 130; 
deeb.startHeight = 130; 
deeb.slugPeriod = 60;
deeb.speed = 3;
deeb.eyeSize = 20;
deeb.mouthWidth = 10;
deeb.fill = "#DEEBEE";
deeb.setup = function(x, y){
	this.count=random(0,10,false);
	this.speed = random(3, 5, false);
	if(random(0,1)<1){
		this.speed=-this.speed;
	}
	this.xPos = x; 
	this.yPos = y;
	this.eyeSize = random(20,30, false);
	this.mouthWidth = random(5,15);
	this.bodyWidth += random(-20, 20); 
	this.bodyHeight += random(-20, 20); 
	this.slugPeriod = random(40,70);
	// this.update();
	this.drawBody(x, y);
}
deeb.update = function(){
	this.count++;
	this.xPos+=this.speed;
	this.drawBody(this.xPos, this.yPos);
	var amplitude = 7;
	var y = Math.sin( (this.count/this.slugPeriod*2*Math.PI)+Math.PI ) * amplitude;
	this.bodyHeight = this.startHeight+y;
}
deeb.drawBody = function(x, y){
	fill("#DEEBEE");
	pEllipse(x, y-(this.bodyHeight/2), this.bodyWidth, this.bodyHeight);
	fill("#d3e4e8");
	fEllipse(x, y-(this.bodyHeight/2), this.bodyWidth*0.8, this.bodyHeight*0.9);
	fill("#DEEBEE");
	fRect(x-(this.bodyWidth/2), y-(this.bodyHeight/2), this.bodyWidth, this.bodyHeight/2);
	fill("#d3e4e8");
	fRect(x-(this.bodyWidth*0.8/2), y-(this.bodyHeight/2), this.bodyWidth*0.8, this.bodyHeight/2);

	pLine(x-(this.bodyWidth/2), y-(this.bodyHeight/2), x-(this.bodyWidth/2), y);
	pLine(x+(this.bodyWidth/2), y-(this.bodyHeight/2), x+(this.bodyWidth/2), y);
	pLine(x-(this.bodyWidth/2),y,x+(this.bodyWidth/2),y)
	this.face();
}
deeb.face = function(){
	//eyes
	fill("white");
	pEllipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	pEllipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	fill("black");
	ellipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), 2);
	ellipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), 2);
	//mouth
	pLine(this.xPos-this.mouthWidth, this.yPos-(this.bodyHeight*0.8), this.xPos+this.mouthWidth, this.yPos-(this.bodyHeight*0.8))
}

//////////////////////////////////////////////////////////////////////////////////////////// ???

/////////////////////////////////////////////////////////////////////////////////////////////////// FLORA

//////////////////////////////////////////////////////////////////////////////////////////// FLOWER

var flower = {};
flower.xPos = 0;
flower.yPos = 0;
flower.flowerCount = 3;
flower.stemLean = 0;
flower.stemHeight = 0;
//why won't my array work? this sucks.
flower.xPosition1 = 30;
flower.yPosition1 = 100;
flower.xPosition2 = 30;
flower.yPosition2 = 100;
flower.xPosition3 = 30;
flower.yPosition3 = 100;
flower.hue = 360;
flower.brightness = 0;
flower.fill = "hsla(340, 100%, 60%, 1.0)";
flower.setup = function(x, y){
	this.xPos = x; 
	this.yPos = y;
	this.flowerCount = random(2,5);
	this.hue += random(-20,20);
	this.brightness = random(30, 50);
	this.fill = "hsla("+ this.hue +", 100%, "+this.brightness+"%, 1.0)";
	this.xPosition1 = random(-30, 30);
	this.yPosition1 = random(30, 100);
	this.xPosition2 = random(-30, 30);
	this.yPosition2 = random(30, 100);
	this.xPosition3 = random(-30, 30);
	this.yPosition3 = random(30, 100);
}
flower.update = function(){
	fill(this.fill);
	this.drawStem(this.xPos, this.yPos, this.xPos+this.xPosition1, this.yPos-this.yPosition1, 30);
	this.drawStem(this.xPos, this.yPos, this.xPos+this.xPosition2, this.yPos-this.yPosition2, 20);
	this.drawStem(this.xPos, this.yPos, this.xPos+this.xPosition3, this.yPos-this.yPosition3, 15);
}
flower.drawStem = function(x1, y1, x2, y2, r){
	pLine(x1, y1, x2, y2);
	pEllipse(x2, y2, r, r);
}

//////////////////////////////////////////////////////////////////////////////////////////// PLANT 

var plant = {};
plant.xPos = 0;
plant.yPos = 0;
plant.fill = "yellow";
plant.setup = function(x, y){
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
	}else if(chooseLife>=0.30 && chooseLife <0.60){
		var tempFlower = Object.create(flower);
		tempFlower.setup(random(-100,w), random(0,h,false));
		objects.push( tempFlower );
	}else{
		var tempPlant = Object.create(plant);
		tempPlant.setup(random(-100,w), random(0,h,false));
		objects.push( tempPlant );
		// objects.push(  );
	}
}

var jsonString = JSON.stringify(objects);
// console.log(jsonString);

setInterval(function(){
	background();
	objects.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});
	for(var i=0; i<objects.length; i++){
		if(objects[i].speed>0){
			if(objects[i].xPos > width+objects[i].bodyWidth){
				objects[i].xPos = -100; 
			}
		}else{
			if(objects[i].xPos < -100){
				objects[i].xPos = w+100; 
			}
		}
		objects[i].update();
	}
}, 33);

