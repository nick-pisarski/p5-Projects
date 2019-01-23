let controls;
let center;
let p;

function setup() {
  createCanvas( 600, 600 );
  controls = new Controls();
  center = createVector( height / 2, width / 2 )
  p = new Particle( center );
}

function draw() {
  background( 0 );
  keys = controls.readKeys( true );
  p.update( keys );
  p.render();
}
