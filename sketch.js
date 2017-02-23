var scl = 10;
var gridSize = 50;
var grid;

function setup() {
    createCanvas(500, 500);

    // Create grid
    grid = [];
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = random() < 0.5;
        }
    }
}

function draw() {
    background(0);

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (grid[i][j] === true) {
                fill(255);
            } else {
                fill(0);
            }
            rect(i * scl, j * scl, scl, scl);
        }
    }
    
}