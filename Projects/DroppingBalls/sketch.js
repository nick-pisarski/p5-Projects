let ball;
const balls = [];
const startingBalls = 2;
const gravity = 3;
const radius = 250;

getColor = val => map( val, 0, width, 0, 255 );

function setup() {
  const canvas = createCanvas( 800, 800 );
  canvas.parent( 'sketch' );
  colorMode( HSB )
  // for(let i = 0; i < startingBalls; i++){
  //   balls.push(new Ball(random(0, width), random(0, height/2), radius));
  // }
  // ball = new ShrinkingBall(width / 2, 0);
}

function draw() {
  background( 0 );
  for ( let i = balls.length - 1; i >= 0; i-- ) {
    balls[ i ].update();
    if ( !balls[ i ].on_screen ) {
      balls.splice( i, 1 );
    }
  }
}

function mousePressed() {
  balls.push( new ShrinkingBall( mouseX, mouseY, radius ) );
}
