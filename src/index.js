const gridSize = 25; // Number of squares in each row and column
const canvasSize = 500; // Size of the canvas in pixels
const squareSize = canvasSize / gridSize; // Size of each square

// Define the two-dimensional array representing the grid
const numRows = gridSize;
const numColumns = gridSize;

// Create a new 2D array
const gridArray = [];
for (let i = 0; i < numRows; i++) {
  // Create a new row
  const row = [];
  for (let j = 0; j < numColumns; j++) {
    // Set each value to false
    row.push(false);
  }
  // Add the row to the array
  gridArray.push(row);
}

//settiung the position of the snake
let headCoordinate = [0,4];
let tailCoordinate = [0,0];
gridArray[0][0] = true
gridArray[0][1] = true
gridArray[0][2] = true
gridArray[0][3] = true
gridArray[0][4] = true

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
        const filled = arr[y][x];
        
        // Set the fill color based on the boolean value
        ctx.fillStyle = filled ? "#000" : "#FFF";
        
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
  }


function animFrame(){
    drawGrid(gridArray);
    setTimeout(function() {
        requestAnimationFrame(animFrame,canvas);
        onEachStep();
    }, 1000/10);
}
function onEachStep() {
    headCoordinate[1] = (headCoordinate[1] + 1) % 25
    gridArray[0][headCoordinate[1]] = true;
    gridArray[0][tailCoordinate[1]] = false;
    tailCoordinate[1] = (tailCoordinate[1] + 1) % 25
    console.log('draw')
    drawGrid(gridArray);
};


animFrame();

