let grid;
let ageGrid;
let cols;
let rows;
let resolution = 5;
let birth = [3];
let survival = [2, 3];
let maxAge = 25; 
let speed = 30;
function createGrid() {
    createCanvas((Math.floor(window.innerWidth / resolution)) * resolution, (Math.floor(window.innerHeight / resolution)) * resolution);
    cols = width / resolution;
    rows = height / resolution;
  
    grid = make2DArray(cols, rows);
    ageGrid = make2DArray(cols, rows, 0);
}
function setup() {
    createGrid();
    frameRate(speed);
    totalreset();
}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                let age = ageGrid[i][j];
                fill(map(age, 0, 20, 100, 255));
                stroke(0);
                //rect(x, y, resolution - 1, resolution - 1);
                ellipse(x + resolution / 2, y + resolution / 2, resolution - 1, resolution -1);
            }
        }
    }
  
    let next = make2DArray(cols, rows);
    let nextAgeGrid = make2DArray(cols, rows, 0);

    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && birth.includes(neighbors)) {
                next[i][j] = 1;
                nextAgeGrid[i][j] = 1;
            } else if (state == 1 && survival.includes(neighbors)) {
                if (ageGrid[i][j] < maxAge) {
                    next[i][j] = 1;
                    nextAgeGrid[i][j] = ageGrid[i][j] + 1;
                } else {
                    next[i][j] = 0;
                }
            } else {
                next[i][j] = 0;
            }
        }
    }

    grid = next;
    ageGrid = nextAgeGrid;
}

function make2DArray(cols, rows, initialValue = 0) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(initialValue);
    }
    return arr;
}


function countNeighbors(grid, x, y) {
    let sum = 0;
    let cols = grid.length;
    let rows = grid[0].length;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function updatePara() {
    speed = Number(document.getElementById("speed").value);
    birth = document.getElementById("birth").value.split(",").map(Number);
    survival = document.getElementById("survival").value.split(",").map(Number);
    maxAge = Number(document.getElementById("maxAge").value);
    resolution = Number(document.getElementById("resolution").value);

    frameRate(speed);
    createGrid();
    frameRate(speed);
    totalreset();
}

function resetGrid() {
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    ageGrid = make2DArray(cols, rows, 0);

    totalreset();
}

function totalreset() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
            ageGrid[i][j] = grid[i][j] === 1 ? 1 : 0;
        }
    }
}
