// Need to rethink this and look at instatiating a new p5 object for each project
// https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace

app.sketch = ( p ) => {
  let balls;
  let startingBalls;
  let gravity;
  let radius;

  p.setup = function () {
    p.createCanvas( 800, 800 );
    p.colorMode( p.HSB );
    balls = [];
    startingBalls = 2;
    gravity = 3;
    radius = 250;
  }

  p.draw = function () {
    p.background( 0 );
    for ( let i = balls.length - 1; i >= 0; i-- ) {
      balls[ i ].update();
      if ( !balls[ i ].on_screen ) {
        balls.splice( i, 1 );
      }
    }
  }

  p.mousePressed = function () {
    balls.push( new ShrinkingBall( p, p.mouseX, p.mouseY, radius, gravity ) );
  }

}
