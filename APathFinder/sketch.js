let maze;
let start;
let end;
let pathfinder;

const DENSITY = .2;
const TILE_SIZE = 20;



// Y == ROWS == HEIGHT
// X == COLUMNS == WIDTH
//GRID == GRID[ROWS][COLUMNS]

function setup() { 
  createCanvas(800, 800);
  frameRate(5);

  maze = new Maze(TILE_SIZE);
  maze.buildGrid(DENSITY);

  setStartAndEndPoints();
 

  pathfinder = new AStar(maze.grid, start, end, false, 'VISUAL');

} 

function draw() { 
  background(102, 173, 107);
  maze.showGrid();
  start.show(color(0,255,0))
  end.show(color(255,0,0))

  const done = pathfinder.step();

  // if(done != 0)  noLoop(); 
  if(done != 0)  reset(); 

  const currentPath = pathfinder.path();
  drawPath(currentPath);  
}


function reset () {
  maze = new Maze(TILE_SIZE);
  maze.buildGrid(DENSITY);

  setStartAndEndPoints(); 

  pathfinder = new AStar(maze.grid, start, end, true, 'VISUAL');
}

function setStartAndEndPoints(){
   // Grab Starting Points and make sure they dont have walls;
   const startPos = randomPostion(maze.rows-1, maze.cols-1);
   const endPos = randomPostion(maze.rows-1, maze.cols-1);
   start = maze.grid[startPos.y][startPos.x];
   end = maze.grid[endPos.y][endPos.x];
 
 
   start.wall = false;
   end.wall = false;
}


function drawPath(path) {
  // Drawing path as continuous live
  noFill();
  stroke(255, 0, 200);
  strokeWeight(2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
      vertex(path[i].x + path[i].width / 2, path[i].y + path[i].height / 2);
  }
  endShape();
}

function randomPostion(yMax, xMax){
  return {
    y: floor(random(0, yMax)),
    x: floor(random(0, xMax))
  }
}