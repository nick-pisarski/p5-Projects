class Light extends Entity {
  constructor( x, y, size, color ) {
    super( x, y, size );
    this.color = color;
  }

  render( state ) {
    let c = this.color;
    if ( !state ) {
      c = color( this.color.levels[ 0 ] * .25, this.color.levels[ 1 ] * .25, this.color.levels[ 2 ] * .25 );
    }
    push();
    strokeWeight( 1 );
    stroke( 0 );
    fill( c );
    ellipseMode( CENTER );
    ellipse( this.x, this.y, this.size, this.size );
    pop();
  }
}
