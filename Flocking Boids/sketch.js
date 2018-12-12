// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

let flock;

let alignSlider, cohesionSlider, separationSlider;
let showPerception = false;
let perceptionRange = 25;

const DEF_ALIGN = 1;
const DEF_COHESION = 1;
const DEF_SEPARATION = 1;
const FLOCK_SIZE = 500;

function setup() {
  createCanvas(windowWidth - 40, windowHeight - 180);
  makeControls();
  resetFlock();
}

function draw() {
  background(0);
  const snapshot = flock.slice(0);
  for (let boid of flock) {
    boid.update(snapshot);
    boid.show();
  }
}

function resetFlock(){
  flock = [];
  for (let i = 0; i < FLOCK_SIZE; i++) {
    flock.push(new Boid());
  }
}