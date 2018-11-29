const maxCycles = 200;
const numSeedPoints = 3;
const interPerCycle = 200;
const lerpFactor = 0.5;

let cycle = 0;
const seedPoints = [];
let rx, ry;

function setup() {
  createCanvas(800, 800);
  createPoints();
}

function draw() {
  
// reset and draw a new one
  if(cycle == maxCycles){
    createPoints();
    cycle = 0;
  }

  for (let i = 0; i < interPerCycle; i++) {
    const r = floor(random(seedPoints.length));
    const p = seedPoints[r];
    rx = lerp(rx, p.x, lerpFactor);
    ry = lerp(ry, p.y, lerpFactor);
    stroke(p.c);
    point(rx, ry);
  }

  cycle++;
}

function createPoints(){  
  background(0);

  // create and draw seed points
  for (let i = 0; i < numSeedPoints; i++) {
    const x = random(width);
    const y = random(height);
    const c = color(random(255), random(255), random(255));
    seedPoints[i] = {x, y, c}
    strokeWeight(c); 
    point(x, y);
  } 
  //
  rx = random(width);
  ry = random(height);  
}
