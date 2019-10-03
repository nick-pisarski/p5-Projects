class RoadSegment extends Entity {
  constructor( x, y, size, orientation = 'h' ) {
    super( x, y, size );
    this.color = color( 200, 200, 200 );
    this.orientation = orientation;
  }

  render() {
    push();

    noStroke();
    fill( this.color );
    rectMode( CENTER )
    rect( this.x, this.y, this.size, this.size );

    if ( this.orientation = 'h' ) {
      strokeWeight( 2 );
      stroke( color( 255, 204, 0 ) );
      line( this.x - this.size / 4, this.y, this.x + this.size / 4, this.y );
    }

    pop();

  }
}
