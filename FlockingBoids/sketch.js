let flock;
let boidTree;
let boundary;

let alignSlider, cohesionSlider, separationSlider;
let showPerception = false;
let showCenter = false;
let showPosition = false;
let showName = false;
let perceptionRange = 50;
let randomBoids = false;
let flockSize = 50;

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
  boundary = new Rectangle( width / 2, height / 2, width, height );
  // boundary.render();
  boidTree = new BoidTree( boundary, 4 );
  const snapshot = flock.slice( 0 );

  for ( let i = 0; i < snapshot.length; i++ ) {
    const boid = snapshot[ i ]
    boidTree.insert( boid );
    boid.update( snapshot );
    boid.render();
  }

}

function resetFlock() {
  print( 'Resetting Flock...' );
  flock = [];
  for ( let i = 0; i < flockSize; i++ ) {
    const name = `${i + 1}`;
    if ( randomBoids ) {
      const maxForce = random() / 10;
      const maxSpeed = random( 3 );
      flock.push( new Boid( name, maxForce, maxSpeed ) )
    } else {
      flock.push( new Boid( name ) );
    }
  }
}

function doubleClicked( $e ) {
  print( `[ ${$e.x}, ${$e.y} ]` );
}

/* Nick TODO -
 * add obsticles for items to determine
 * improve optimizations for get surround boids
 */
