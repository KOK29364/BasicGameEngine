

// gameBoard is the object that houses the canvas
var gameBoard = {
	
	canvas : document.createElement("canvas"),
	// Initialize the gameBoard
	initialize : function(){
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
	// TO-DO: Draw static objects
	draw : function(){
		this.gc.fillStyle = '#000000';
		this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
	},
	// Resize the canvas depending on how much space is available
	resize : function(){
		// If the width to height ratio is larger than desired, use height as the basis for size
		if((window.innerWidth / window.innerHeight) > this.resolution){
			this.canvas.width = window.innerHeight * this.resolution;
			this.canvas.height = window.innerHeight;
		}
		// If the width to height ratio is smaller than desired, use width as the basis for size
		else if((window.innerWidth / window.innerHeight) < this.resolution){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerWidth / this.resolution;
		}
		// If the width to height ratio is the same as the desired ratio, both can be used
		else{
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}
		console.log(this.canvas.width, this.canvas.height);
	},
	// Clear all the drawing in the gameBoard
	clear : function(){
		this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}

function update(){
	//gameBoard.clear();
	gameBoard.resize();
	gameBoard.draw();
}

gameBoard.initialize();
gameBoard.setResolution(4 / 3);
setInterval(update, 20);

