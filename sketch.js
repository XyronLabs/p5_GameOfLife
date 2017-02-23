var scl = 10;
var gridSize = 60;
var grid, successorGrid;
var running = false;

function setup() {
    createCanvas(gridSize * scl, gridSize * scl);

    // Create grid
    grid = [];
    successorGrid = [];
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        successorGrid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = false;
            successorGrid[i][j] = false;
        }
    }

    frameRate(20);
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

    if (running) {
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                applyRules(i,j);
            }
        }
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                grid[i][j] = successorGrid[i][j];
            }
        }
    }

}

function applyRules(x, y) {
    var n = getNumNeighbours(x,y);

    // 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    if (grid[x][y] && n < 2) successorGrid[x][y] = false;

    // 2. Any live cell with two or three live neighbours lives on to the next generation.
    if (grid[x][y] && (n == 2 || n == 3)) successorGrid[x][y] = true;
    
    // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
    if (grid[x][y] && n > 3) successorGrid[x][y] = false;
    
    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    if (!grid[x][y] && n == 3) successorGrid[x][y] = true;

}

function getNumNeighbours(x, y) {
    var neighbours = 0;
    for (xa = x - 1; xa <= x + 1; xa++) {
        for (ya = y - 1; ya <= y + 1; ya++) {
            if (xa >= 0 && ya >= 0 && xa < gridSize && ya < gridSize && !( xa == x && ya == y)) {
                if (grid[xa][ya]) neighbours++;
            }
        }
    }
    return neighbours;
}

function mousePressed() {
    if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        var cx = floor(mouseX / scl);
        var cy = floor(mouseY / scl);

        grid[cx][cy] = !grid[cx][cy];
    }
}

function keyPressed() {
    if (key == ' ') {
        running = !running;
    } else if (key == 'R') {
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                grid[i][j] = random() < 0.1;
            }
        }
    }
}