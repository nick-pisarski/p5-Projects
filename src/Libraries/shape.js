class ShapeCreator {
  constructor( p5 ) {
    this.p5 = p5;
  }

  createShapeVertices( sides ) {
    const shape = [];
    const r = ( this.p5.min( this.p5.height, this.p5.width ) / 2 ) - 10;
    const cx = this.p5.width / 2;
    const cy = this.p5.height / 2;

    const rotation = this.p5.TWO_PI / sides;
    let angle = 0

    for ( let i = 0; i < sides; i++ ) {
      const point = {
        x: cx + r * this.p5.cos( angle ),
        y: cy + r * this.p5.sin( angle )
      }
      shape.push( point );

      angle += rotation;
    }

    return shape;
  }

  drawCircle( x, y, d ) {
    this.p5.stroke( 'rgba(255,255,255,0.25)' )
    this.p5.strokeWeight( 1 )
    this.p5.noFill()
    this.p5.ellipse( x, y, d, d );
  }

  drawSquare( x, y, size ) {
    this.p5.stroke( 'rgba(255,255,255,0.25)' )
    this.p5.strokeWeight( 1 );
    this.p5.noFill();
    this.p5.rectMode( CENTER );
    this.p5.rect( x, y, size, size )
  }

  drawPoint( x, y ) {
    this.p5.stroke( 0, 255, 0 )
    this.p5.strokeWeight( 6 );
    this.p5.point( x, y );
  }

  drawLine( x1, y1, x2, y2 ) {
    this.p5.stroke( 'rgba(255,255,255,0.1)' )
    this.p5.strokeWeight( 2 );
    this.p5.line( x1, y1, x2, y2 );
  }

}

/************************************************************************/

class Curve {
  constructor( p5, strokeWeight = 1, strokeColor, ) {
    this.p5 = p5;
    this.path = [];
    this.current = this.p5.createVector();
    this.color = strokeColor || this.p5.color( this.p5.random( 255 ), this.p5.random( 255 ), this.p5.random( 255 ) );
    this.strokeWeight = strokeWeight;
  }

  setX( x ) {
    this.current.x = x;
  }

  setY( y ) {
    this.current.y = y;
  }

  addPoint() {
    this.path.push( this.current );
  }

  reset() {
    this.path = []
  }

  drawCurrentPoint() {
    this.p5.stroke( 255 );
    this.p5.strokeWeight( 5 );
    this.p5.point( this.current.x, this.current.y );

    this.current = this.p5.createVector();
  }

  draw() {
    this.p5.stroke( this.color );
    this.p5.strokeWeight( this.strokeWeight );
    this.p5.noFill();
    this.p5.beginShape();
    for ( let i = 0; i < this.path.length; i++ ) {
      this.p5.vertex( this.path[ i ].x, this.path[ i ].y )
    }
    this.p5.endShape();

    this.drawCurrentPoint();

  }
}
