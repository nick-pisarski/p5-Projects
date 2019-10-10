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

}

/************************************************************************/

class Curve {
  constructor( strokeWeight = 1, strokeColor, ) {
    this.path = [];
    this.current = createVector();
    this.color = strokeColor || color( random( 255 ), random( 255 ), random( 255 ) );
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
    stroke( 255 );
    strokeWeight( 5 );
    point( this.current.x, this.current.y );

    this.current = createVector();
  }

  draw() {
    stroke( this.color );
    strokeWeight( this.strokeWeight );
    noFill();
    beginShape();
    for ( let i = 0; i < this.path.length; i++ ) {
      vertex( this.path[ i ].x, this.path[ i ].y )
    }
    endShape();

    this.drawCurrentPoint();

  }
}
