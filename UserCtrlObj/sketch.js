let controls;
let center;
let p;

function setup() {
  const canvas = createCanvas( 600, 600 );
  canvas.parent( 'sketch' );

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
