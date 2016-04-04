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
* + lemming sounds on death?
* - spawn new deebs
*
*/

//#############################################################################################################
//##########  ####  ##      ##  #######  ########    ####      ####     ###      ###     ##        ###     ####
//##########    ##  ##  ######  ##   ##  ######  ####  ##  ###   #####  ###  ######  #########  ####   ########
//##########  #  #  ##      ##  #  #  #  ######  ####  ##      #######  ###      ##  #########  #####     #####
//##########  ##    ##  ######    ###    ######  ####  ##  ###   #####  ###  ######  #########  #########   ###
//##########  ####  ##      ##  #######  #######     ####      ###     ####      ##      #####  #####     #####
//#############################################################################################################
// Restart. Initiates new creatures. 

var newData = function(){	
	var total = 400; 
	var objects = [];
	var names = ["Buffy", "Willow", "Xander", "Giles", "Angel", "Spike", "Cordelia", "Oz", "Tara", "Dawn", "Anya", "Joyce", "Jonathan", "Glory", "Malcolm", "Kaylee", "Zoe", "Wash", "Jayne", "Inara", "Simon", "River", "Shepherd", "Paul", "John", "Ringo", "George", "Lorelai", "Rory", "Jess", "Dean", "Luke", "Max", "Paris", "Sookie", "Ms. Patty", "Lane", "Michel", "Kirk", "Digger", "Taylor", "Marty", "Logan", "Christopher", "Emily", "Richard", "Maxmilian", "Benji", "Jon", "Keith", "Milena", "Andre", "Little Max", "Talia", "Eric", "Melissa", "Eloise", "Mark", "Tom", "Travis", "Dan", "Phil", "Julian", "Nikolai", "Fabrizio", "Nick", "Albert", "James Tiberius", "Spock", "McCoy", "Uhura", "Scotty", "Sulu", "Chekov", "Bartlet", "Leo", "Josh", "Toby", "Donna", "Charlie", "CJ", "Mandy", "Amy", "JD", "Turk", "Elliot", "Carla", "Kelso", "Perry", "Janitor", "Laverne", "Rose", "Mickey", "Jack", "Donna", "Martha", "River Song", "Amy ", "Rory", "Clara Oswin", "The Doctor", "Ten", "Eleven", "Twelve", "Thirteen", "Frodo", "Sam", "Merry", "Pippin", "Aragorn", "Boromir", "Faramir", "Legolas", "Eowyn", "Arwen", "Gimli", "Gandalf", "Elrond", "Galadriel", "Bombadil", "Saruman", "Bilbo", "Fëanor", "Lúthien", "Eru", "Ilúvatar", "Fingolfin", "Beren", "Luthien", "Thingol", "Elendil", "Elwing", "Isildur", "Glorfindel", "Sauran", "Harry ", "Ron", "Hermione", "Neville", "Drako", "Volde", "Rachel", "Bucky", "Elizabeth", "McKibben", "Lanier", "Rushkoff", "Walden", "Mars", "Jupiter", "Pluto", "Neptune", "Uranus", "Mercury", "Saturn", "Venus", "Galifrey", "Moon Moon", "Idgy Dean", "Debbie", "Black", "Biersack", "Tommy", "Joey", "Dee Dee", "Marky", "Johnny", "Richie", "Clem", "Jack", "Meg", "Mercer", "Brian", "Brandon", "Win", "Will", "Billy", "Regine", "Pink", "Ariel", "Mayberry", "Clif", "Colin", "Bowie", "Donnie", "Zach", "Elton", "Marshall", "Stevie", "Fleetwood", "Monty", "Zilla", "Zubin", "Muska", "Lee", "Wolfgang", "Lesley", "Jesusita", "Layne", "Efren", "Daron", "Jennell", "Sheridan", "Letisha", "Demetria", "Etha", "Eva", "Hee", "Annett", "Janella", "Tynisha", "Cathrine", "Terisa", "Jesusa", "Jeane", "Yvone", "Carmelina", "Isaias", "Gertude", "April", "Lisabeth", "Sook", "Kayce", "Edythe", "Otto", "Lelah", "Latrina", "Klara", "Anderson", "Signe", "Kathrin", "Leoma", "Raul", "Katherina", "Andree", "Nelida", "Maryann", "Kamilah", "Celine", "Cathern", "Nohemi", "Ethelyn", "Manie", "Donovan", "Elayne", "Kathlyn", "Laima", "Elena", "Linnea", "Kanisha", "Vita", "Ruthann", "Thaddeus", "Joanna", "Glennis", "Zena", "Dagny", "Rosita", "Jadwiga", "Debi", "Terence", "Willy", "Kymberly", "Jacinto", "Raelene", "Renata", "Rebekah", "Myrtice", "Delmer", "Lakenya", "Martina", "Leighann", "Elinor", "Nan", "Anastasia", "Kiley", "Akilah", "Hugh", "Lincoln", "Jestine", "Quentin", "Darrell", "Vicenta", "Dustin", "Candra", "Shea", "Agatha", "Cordia", "Henriette", "Jade", "Alberto", "Dotty", "Effie", "Macie", "Timmy", "Roxanna", "Karl", "Chana", "Mana", "Bette", "Hosea", "Ona", "Kitty", "Marnie", "Abby", "Greg", "Senaida", "Matha", "Laree", "Desiree", "Roderick", "Loyce", "Rossie", "Thersa", "Karoline", "Annie", "Socorro", "Weldon", "Antoinette", "Freeman", "Harvey", "Pamula", "Pura", "Lucrecia", "Corina", "Jaye", "Lashay", "Kyle", "Alyssa", "Dawn", "Dedra", "Syble", "Ashlyn", "Sarah", "Judy", "Pok", "Geth", "Ismael", "Vern", "Werner", "Elvira", "Charline", "Jarvis", "Becky", "Carlo", "Hiedi", "Vance", "Juliette", "Marylin", "Rosena", "Tinisha", "Camilla", "Aiko", "Jacquie", "Jone", "Roonie", "Leatrice", "Emilie", "Spring", "Teodoro", "Tai", "Normand", "Cristin", "Euna", "Lester", "Ashanti", "Booker", "Margo", "Lyman", "Yetta", "Audrey", "Kellee", "Daria", "Pennie", "Bryanna", "Lulu", "Marcelo", "Kelley", "Gerda", "Ricky", "Nenita", "Kathlene", "Geoffrey", "Laureen", "Kit", "Maxie", "Hollis", "Weston", "Janey", "Randy", "Pat", "Lisha", "Ginette", "Dane", "Temple", "Hermina", "Sherill", "Chris", "Shannon", "Bluvband"];

	for(var oCount=0; oCount<total; oCount++){
		var tempDeeb = Object.create(deeb);
		tempDeeb.init(random(-100,w, false), random(100,h,false), oCount, names[oCount]);
		objects.push( tempDeeb );
	}

	var today = new Date();

	var systemInfo = {};
	systemInfo.points = 100;
	systemInfo.deebsAlive = 400; 
	systemInfo.deebsDead = 0; 
	systemInfo.visitors = 0; 
	systemInfo.lastArchive = 0; 
	systemInfo.lastVisit = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();

	var fullFile = {};
	fullFile.info = systemInfo; 
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
};
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
			var deadAtStart = systemInfo.deebsDead; 
			days = 9; 

			systemInfo.lastArchive += days+1; 
			console.log("last arch", systemInfo.lastArchive);

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

			dFills = getDeebFills(systemInfo.points);
			dStroke = getDeebStroke(systemInfo.points);
			ddFills = getDeadDeebFills();
			ddStroke = "hsla(180,10%,80%,0.2)";
			bgPattern = backgroundPattern(systemInfo.points);
			
			if(deadCount-deadAtStart > 0){
				var youKilled = deadCount - deadAtStart;
				if(youKilled == 1){
					systemYourFault.innerHTML = ", and causing in the death of one deeb (may they rest in peace)";
				}else{
					systemYourFault.innerHTML = ", and causing in the death of " + youKilled +" deebs (may they rest in peace)";
				}
			}
			if(systemInfo.points<=0) systemInfo.points=0; 
			
			systemHealth.innerHTML = systemInfo.points;
			createObjectArray(systemInfo.points, myDeebs);

			systemInfo.lastVisit = visited;
			systemInfo.deebsDead = deadCount;


			var infoText = document.getElementById("introText");
			infoText.style.opacity = "1";
		}
	}
	xmlObjects.send();
};
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
		dFills = getDeebFills(p);
		dStroke = getDeebStroke(p);
		ddFills = getDeadDeebFills();
		ddStroke = "hsla(180,10%,80%,0.2)";
		bgPattern = backgroundPattern(p);
		// createObjectArray(p, myDeebs);
		createArchiveArray(p, myDeebs);
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
};


///////////////////////////////////////////////////////////////////////////// SAVE IMAGES TO FILE

var saveImages = function(imgs){
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
		console.log("archived");
	});
};

/////////////////////////////////////////////////////////////////////////////// CREATE OBJECTS FROM ARRAY
var positionsDeebs = [[272, 427], [771, 728], [146, 460], [474, 60], [599, 76], [643, 400], [540, 336], [207, 168], [479, 585], [108, 549], [471, 722], [509, 80], [499, 282], [478, 670], [76, 659], [340, 166], [148, 515]];
var positionsFlowers = [[541, 647], [663, 546], [579, 334], [267, 57], [715, 413], [750, 302], [543, 581], [781, 273], [475, 501], [225, 689], [336, 627], [253, 91], [105, 343], [303, 636], [209, 211], [516, 533], [374, 192], [677, 644], [695, 297], [67, 492], [238, 674], [786, 131], [511, 275], [398, 333], [370, 446], [660, 604], [117, 738], [577, 640], [769, 97], [486, 209], [61, 290], [339, 374], [461, 766], [635, 572], [42, 568], [359, 320], [478, 650], [648, 760], [684, 555], [565, 278], [226, 299], [550, 253]];
var positionsPlants = [[271, 19], [89, 533], [643, 71], [559, 452], [219, 404], [737, 709], [275, 88], [61, 147], [188, 562], [205, 525], [207, 122], [777, 127], [142, 77], [579, 592], [613, 631], [47, 74], [56, 521], [639, 696], [322, 669], [158, 719], [551, 290], [628, 144], [391, 543], [638, 589], [23, 585], [105, 345], [10, 52], [700, 681], [228, 755], [582, 378], [600, 41], [780, 613], [702, 733], [414, 760]];
var positionsGrass = [[187, 64], [283, 343], [339, 47], [108, 386], [336, 234], [269, 61], [98, 180], [187, 239], [60, 254], [47, 345], [60, 148], [97, 183], [47, 247], [288, 347], [386, 32], [246, 134], [126, 300], [109, 26], [372, 341], [80, 50], [79, 324], [200, 344], [220, 173], [117, 366], [65, 83], [231, 151], [333, 54], [40, 185]];
var positionsBushes = [[408, 150], [75, 597], [177, 154], [181, 480], [412, 369], [145, 99], [69, 777], [585, 514], [278, 435], [504, 603], [483, 177], [478, 412], [174, 256], [368, 200], [162, 333], [367, 605], [515, 575]];
var positionsRocks = [[452, 554], [188, 768], [580, 342], [642, 570], [455, 475], [703, 535]];
var archiveDeebs = [242, 93, 156, 240, 183, 283, 289, 274, 283, 271, 148, 239, 116, 182, 107, 346, 390];

var createArchiveArray = function(p, dbs){
	var density = 28;
	var rockCount = Math.round( density*0.2 );  
	var grassCount = Math.round( density );  
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
	for(var i=0; i<17; i++){
		var tempDeeb = Object.create(deeb);
		tempDeeb.setup(positionsDeebs[i][0], positionsDeebs[i][1], dbs[archiveDeebs[i]].name, dbs[archiveDeebs[i]].points, dbs[archiveDeebs[i]].bodyWidth, dbs[archiveDeebs[i]].bodyHeight, dbs[archiveDeebs[i]].state, dbs[archiveDeebs[i]].speed, dbs[archiveDeebs[i]].index);
		if(tempDeeb.state == 0){
			deadCount++;
		}
		jsonObjects.push( tempDeeb );
	}
	for(var j=0; j<deebCount; j++){
		critterArray.push( jsonObjects[j] );
	}
	for(var b=0; b<bushCount; b++){
		tempBush = Object.create(bush);
		tempBush.setup(positionsBushes[b][0], positionsBushes[b][1]);
		critterArray.push( tempBush );
	}
	for(var f=0; f<flowerCount; f++){
		var tempFlower = Object.create(flower);
		tempFlower.setup(positionsFlowers[f][0], positionsFlowers[f][1]);
		critterArray.push( tempFlower );
	}
	for(var p=0; p<plantCount; p++){
		var tempPlant = Object.create(plant);
		tempPlant.setup(positionsPlants[p][0], positionsPlants[p][1]);
		critterArray.push( tempPlant );
	}
	for(var r=0; r<rockCount; r++){
		var tempRock = Object.create(rock);
		tempRock.setup(positionsRocks[r][0], positionsRocks[r][1]);
		critterArray.push( tempRock );
	}
	for(var g=0; g<grassCount; g++){
		var tempGrass = Object.create(grass);
		tempGrass.setup( positionsGrass[g][0], positionsGrass[g][1] );
		critterArray.push( tempGrass );
	}	
}


var deadCount;
var createObjectArray = function(p, dbs){
	var density = Math.round( (w*h/22500) );
	var rockCount = Math.round( density*0.2 );  
	var grassCount = Math.round( density );  
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
};

window.onresize = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	w = window.innerWidth;
	h = window.innerHeight;
	jsonObjects = []; 
	deebs = [];
	critterArray = []; 
	readJSON();
};


//#############################################################################################################
//#############################################  ###  ##      ###      ###       ##        ##      ###     ####
//#############################################  ###  ##  ###   #  ###  ##  ###  #####  #####  #####   ########
//#############################################  ###  ##      ###  ###  ##       #####  #####      ##     #####
//#############################################  ###  ##  #######  ###  ##  ###  #####  #####  ##########   ###
//##############################################     ###  #######      ###  ###  #####  #####      ##     #####
//#############################################################################################################
// update loop. where animation happens (sort of).
// draws background, sorts to draw order & draws. 

var hoverCount = 0; 
var drawCanvas = function(){
	fill(bgPattern);
	fRect(0, 0, w, h);
	critterArray.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});

	if( window.scrollY > 0 ){
		for(var i=0; i<critterArray.length; i++){
			// console.log(critterArray);
			// console.log(i, critterArray[i]);
			if( critterArray[i].type == "deeb"){
				if( mouseX > critterArray[i].xPos-critterArray[i].bodyWidth/2 && mouseX < critterArray[i].xPos+critterArray[i].bodyWidth/2 && mouseY < critterArray[i].yPos && mouseY > critterArray[i].yPos-critterArray[i].bodyHeight ){
					if(hoverCount < 1){
						critterArray[i].hover = true;
						hoverCount++;
					}else{
						hoverCount = 0; 
						critterArray[i].hover = false;
					}
				}else{
					hoverCount = 0; 
					critterArray[i].hover = false;
				}
			}else if( critterArray[i].type == "flower"){
				if( mouseX > critterArray[i].xPos-15 && mouseX < critterArray[i].xPos+15 && mouseY < critterArray[i].yPos && mouseY > critterArray[i].yPos-30 ){
					if(hoverCount < 1){
						critterArray[i].hover = true;
						hoverCount++;
					}else{
						hoverCount = 0; 
						critterArray[i].hover = false;
					}
				}else{
					hoverCount = 0; 
					critterArray[i].hover = false;
				}
			}else if( critterArray[i].type == "rock"){
				if( mouseX > critterArray[i].xPos-critterArray[i].width/2 && mouseX < critterArray[i].xPos+critterArray[i].width/2 && mouseY < critterArray[i].yPos && mouseY > critterArray[i].yPos-critterArray[i].height ){
					if(hoverCount < 1){
						critterArray[i].hover = true;
						hoverCount++;
					}else{
						hoverCount = 0; 
						critterArray[i].hover = false;
					}
				}else{
					hoverCount = 0; 
					critterArray[i].hover = false;
				}
			}
			critterArray[i].update();
		}
	}
};

setInterval(function(){
	drawCanvas();
}, 33);

///////////////////////////////////////////////////////////////////////////////////////// SAVE STATE
// copies deebs back to their index in the full deeb array. 
// if system is dead, kill all deebs, not just those active.
// saves to server.

window.onbeforeunload = function(){
	if(points >= 400){
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
};
