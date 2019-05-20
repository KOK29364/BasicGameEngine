

// gameBoard is the object that houses the canvas
var gameBoard = {
	
	canvas : document.createElement("canvas"),
	// Initialize the gameBoard
	initialize : function(){
		this.canvas.setAttribute("style", "margin:auto; display:block");
		document.body.appendChild(this.canvas);
		this.gc = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		// Add action listeners for the mouse
		window.addEventListener('mousemove', function (e) {
     		gameBoard.mouseX = e.pageX;
      		gameBoard.mouseY = e.pageY;
    	});
	},
	// Set the desired resolution for the canvas, in width over height
	setResolution : function(res){
		this.resolution = res;
	},
	// Draw static objects
	draw : function(){
		this.gc.fillStyle = '#000000';
		this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
	},
	// Resize the canvas depending on how much space is available
	resize : function(){
		// If the width to height ratio is larger than desired, use height as the basis for size
		if((window.innerWidth / (window.innerHeight - 20)) > this.resolution){
			this.canvas.width = (window.innerHeight - 20) * this.resolution;
			this.canvas.height = window.innerHeight - 20;
		}
		// If the width to height ratio is smaller than desired, use width as the basis for size
		else if((window.innerWidth / (window.innerHeight - 20)) < this.resolution){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerWidth / this.resolution;
		}
		// If the width to height ratio is the same as the desired ratio, both can be used
		else{
			this.canvas.width = window.innerWidth;
			this.canvas.height = (window.innerHeight - 20);
		}
	},
	// Clear all the drawing in the gameBoard
	clear : function(){
		this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}

// Define a GameObject for all interactable elements of the game
function GameObject(){
	this.x = 0;
	this.y = 0;
	this.width = 10;
	this.height = 10;
	this.draw = function(){};
	this.move = function(){};
}

// Create a Player
function initPlayer(){
	let player = new GameObject();
	player.y = gameBoard.canvas.height / 2;
	player.move = function(){
		this.x += 5;
		if(this.x >= gameBoard.canvas.width){
			this.x = 0;
		}
		console.log(this.x, this.y);
	}
	player.draw = function(gc){
		gc.fillStyle = "#FF0000";
		gc.fillRect(this.x, this.y, this.width, this.height);
	}
	return player;
}

// Update the gameBoards
function update(){
	gameBoard.clear();
	gameBoard.resize();
	gameBoard.draw();
	player.move();
	player.draw(gameBoard.gc);
}

gameBoard.initialize();
gameBoard.setResolution(4 / 3);
let player = initPlayer();
setInterval(update, 20);
