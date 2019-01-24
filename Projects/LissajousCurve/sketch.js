let shapes = [];
let angle = 0;
const speed = 0.01;
let w = 120;
let padding = 0.1;
let cols;
let rows;

function setup() {
  const canvas = createCanvas( windowWidth * .85, windowHeight * .85 );
  canvas.parent( 'sketch' );
  cols = floor( width / w ) - 1;
  rows = floor( height / w ) - 1;

  buildShapesArray( 3 )
}

function draw() {
  background( 0 );

  LissajousCircle();
}

function LissajousCircle() {
  let d = w - ( padding * w );
  let r = d / 2;

  //columns
  for ( let j = 0; j < cols; j++ ) {
    const cx = w + ( j * w + ( w / 2 ) );
    const cy = w / 2;
    p = getCirclePoint( cx, cy, r, j );
    drawCircle( cx, cy, d );
    drawPoint( p.x, p.y )

    for ( let i = 0; i < rows; i++ ) {
      shapes[ i ][ j ].setX( p.x );
    }
  }

  // rows
  for ( let i = 0; i < rows; i++ ) {
    const cy = w + ( i * w + ( w / 2 ) );
    const cx = w / 2;
    p = getCirclePoint( cx, cy, r, i );
    drawCircle( cx, cy, d );
    drawPoint( p.x, p.y )

    for ( let j = 0; j < cols; j++ ) {
      shapes[ i ][ j ].setY( p.y );
    }

  }

  drawShapes();

  updateAngle();
}
