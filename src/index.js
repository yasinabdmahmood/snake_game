
const gridSize = 25; // Number of squares in each row and column
const canvasSize = 500; // Size of the canvas in pixels

// Define the two-dimensional array representing the grid
const numRows = gridSize;
const numColumns = gridSize;
const snakeBody = [[0,0],[1,0],[2,0],[3,0]];

const game = new Game({numColumns, numRows, snakeBody})
const squareSize = canvasSize / gridSize; // Size of each square

document.onkeydown = (e) => {
  e = e || window.event;
  if (e.keyCode === 38) {
    game.setDirection('up');
    console.log("up arrow pressed");
  } else if (e.keyCode === 40) {
    game.setDirection('down');
    console.log("down arrow pressed");
  } else if (e.keyCode === 37) {
    game.setDirection('left');
    console.log("left arrow pressed");
  } else if (e.keyCode === 39) {
    game.setDirection('right');
    console.log("right arrow pressed");
  }
};



// Get the canvas element from the DOM
const canvas = document.getElementById("canvas");

// Set the canvas size
canvas.width = canvasSize;
canvas.height = canvasSize;

// Get the 2D rendering context
const ctx = canvas.getContext("2d");

// Function to draw the grid
function drawGrid(arr) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);
  
    // Set the line width
    ctx.lineWidth = 1;
  
    // Draw the grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Set the fill color based on the boolean value
        ctx.fillStyle ="#FFF";

        // Calculate the coordinates of the square
        const squareX = x * squareSize;
        const squareY = y * squareSize;
        
        // Draw the square
        ctx.fillRect(squareX, squareY, squareSize, squareSize);
        
        // Draw the grid lines
        ctx.strokeStyle = "#000";
        ctx.strokeRect(squareX, squareY, squareSize, squareSize);
      }
    }
    
    // Draw snake body
    arr?.forEach((element, index) => {
      const x = element[0];
      const y = element[1];
      const squareX = x * squareSize;
      const squareY = y * squareSize;
      
      // Draw the square
      if(index === arr.length - 1){
        ctx.fillStyle ="red";
      }else{
        ctx.fillStyle ="#000";
      }
      
      ctx.fillRect(squareX, squareY, squareSize, squareSize);
    });
  }


function animFrame(){
    drawGrid(game.snakeBody);
    setTimeout(function() {
        requestAnimationFrame(animFrame,canvas);
        onEachStep();
    }, 1000/10);
}
function onEachStep() {
    game.calculateNextState();
    drawGrid(game.gridArray);
};


animFrame();

