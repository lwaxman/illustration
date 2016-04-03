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

	var system = {};
	system.points = 100;
	system.deebsAlive = 400; 
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
			console.log(systemInfo.lastArchive);

			var deadAtStart = systemInfo.deebsDead; 

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
