// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

let flock;
let boidTree;
let boundary;

let alignSlider, cohesionSlider, separationSlider;
let showPerception = false;
let showCenter = false;
let perceptionRange = 50;
let randomBoids = false;
let flockSize = 100;

const DEF_ALIGN = 1;
const DEF_COHESION = 1;
const DEF_SEPARATION = 1.5;

function setup() {
  createCanvas( windowWidth - 40, windowHeight - 200 );
  makeControls();
  resetFlock();
}

function draw() {
  background( 0 );

  // Create Quad Tree
  boundary = new Rectangle( windowWidth / 2, windowHeight / 2, windowWidth - 40, windowHeight - 200 );
  boidTree = new BoidTree( boundary, 4 );
  for ( let boid of flock ) {
    boidTree.insert( boid );
  }

  const snapshot = flock.slice( 0 );
  for ( let boid of flock ) {
    boid.update( snapshot );
    boid.render();
  }

}

function resetFlock() {
  flock = [];
  for ( let i = 0; i < flockSize; i++ ) {
    if ( randomBoids ) {
      flock.push( new Boid( maxForce = random( 0 ) / 100, maxSpeed = random( 2 ) ) )
    } else {
      flock.push( new Boid() );
    }
  }
}

/* Nick TODO -
 * add obsticles for items to determine
 * improve optimizations for get surround boids
 */
