// Window - window is always a square
const HEIGHT = 800;
const WIDTH = HEIGHT;

// config
const MAX_FRAMES = 200;
const CYCLES_PER_FRAME = 200;
const LERP_FACTOR = 0.5;
const SHAPE_SIDES = 3;

let cycle = 0;
const seedPoints = [];
let rx, ry;
let shape;


function setup() {
  createCanvas(HEIGHT, WIDTH);

  shape = createShapeVertices(SHAPE_SIDES);  
  createPoints(shape);

  background(0);
  stroke(255);
  strokeWeight(1);
}

function draw() {
  
// reset and draw a new one
  if(cycle == MAX_FRAMES){
    createPoints(shape);
    cycle = 0;
  }

  for (let i = 0; i < CYCLES_PER_FRAME; i++) {
    const r = floor(random(seedPoints.length));
    const p = seedPoints[r];
    rx = lerp(rx, p.x, LERP_FACTOR);
    ry = lerp(ry, p.y, LERP_FACTOR);
    stroke(p.c);
    point(rx, ry);
  }

  cycle++;
}

function createPoints(shape){  
  background(0);
  for (let i = 0; i < shape.length; i++) {
    const x = shape[i].x;
    const y = shape[i].y;
    const c = color(random(255), random(255), random(255));
    seedPoints[i] = {x, y, c}
    strokeWeight(c); 
    point(x, y);
  }
  rx = random(width);
  ry = random(height);     
}

function createRandomPoints(vertices){
  background(0)
  for (let i = 0; i < vertices; i++) {
    const x = random(width);
    const y = random(height);
    const c = color(random(255), random(255), random(255));
    seedPoints[i] = {x, y, c}
    strokeWeight(c); 
    point(x, y);
  } 

  rx = random(width);
  ry = random(height); 
}

