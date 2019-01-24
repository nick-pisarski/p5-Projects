const FRAME_RATE = 60;

let gravity;
let b;

function setup() {
  const canvas = createCanvas( 600, 600 );
  canvas.parent( 'sketch' );

  frameRate( FRAME_RATE );
  gravity = new Force( createVector( 0, 9.5 ), 3, true );
  b = new Ball( width / 2, 50, 20, 25 );
}

function draw() {
  background( 0 );
  b.applyForce( gravity.force );
  b.updatePosition();
  b.display();
  b.displayVelocity();
  b.showInfo();

}
