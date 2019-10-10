app.sketch = ( p5 ) => {
  let shapes = [];
  let angle = 0;
  const speed = 0.01;
  let w = 120;
  let padding = 0.1;
  let cols;
  let rows;
  let shapeCreator;

  p5.setup = function () {
    p5.createCanvas( p5.windowWidth * .85, p5.windowHeight * .85 );

    cols = p5.floor( p5.width / w ) - 1;
    rows = p5.floor( p5.height / w ) - 1;
    shapeCreator = new ShapeCreator( p5 );

    buildShapesArray( 3 )
  }

  p5.draw = function () {
    p5.background( 0 );
    LissajousCircle();
  }

  LissajousCircle = function () {
    let d = w - ( padding * w );
    let r = d / 2;

    //columns
    for ( let j = 0; j < cols; j++ ) {
      const cx = w + ( j * w + ( w / 2 ) );
      const cy = w / 2;
      pnt = getCirclePoint( cx, cy, r, j );
      shapeCreator.drawCircle( cx, cy, d );
      shapeCreator.drawPoint( pnt.x, pnt.y )

      for ( let i = 0; i < rows; i++ ) {
        shapes[ i ][ j ].setX( pnt.x );
      }
    }

    // rows
    for ( let i = 0; i < rows; i++ ) {
      const cy = w + ( i * w + ( w / 2 ) );
      const cx = w / 2;
      pnt = getCirclePoint( cx, cy, r, i );
      shapeCreator.drawCircle( cx, cy, d );
      shapeCreator.drawPoint( pnt.x, pnt.y )

      for ( let j = 0; j < cols; j++ ) {
        shapes[ i ][ j ].setY( pnt.y );
      }

    }

    drawShapes();

    updateAngle();
  }

  updateAngle = function () {
    angle = +( angle - speed ).toFixed( 2 );

    if ( angle < -p5.TWO_PI ) {
      for ( let j = 0; j < rows; j++ ) {
        for ( let i = 0; i < cols; i++ ) {
          shapes[ j ][ i ].reset();
        }
      }
      angle = 0;
    }
  }

  drawShapes = function () {
    for ( let i = 0; i < rows; i++ ) {
      for ( let j = 0; j < cols; j++ ) {
        shapes[ i ][ j ].addPoint();
        shapes[ i ][ j ].draw();
      }
    }
  }

  buildShapesArray = function ( strokeWeight ) {
    for ( let i = 0; i < rows; i++ ) {
      shapes[ i ] = [];
      for ( let j = 0; j < cols; j++ ) {
        shapes[ i ][ j ] = new Curve( p5, strokeWeight );
      }
    }
  }

  getCirclePoint = function ( x, y, r, i ) {
    return {
      x: x + r * p5.cos( angle * ( i + 1 ) - p5.HALF_PI ),
      y: y + r * p5.sin( angle * ( i + 1 ) - p5.HALF_PI )
    }
  }

  // Not Implementedp.
  getSquarePoint = function ( x, y, size ) {
    const i = 0;
    const r = size / 2;
    const a = angle * ( i + 1 );
    return {
      x: x + r * p5.cos( a ),
      y: y + r * p5.sin( a )
    }
  }

}
