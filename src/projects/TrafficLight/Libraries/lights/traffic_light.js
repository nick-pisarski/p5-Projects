class TrafficLight extends Entity {
  constructor( x, y, size = 150 ) {
    super( x, y, size );

    this.state = [ 1, 0, 0 ];

    this.red = new Light( x, y - ( this.size * 0.66 ), this.size / 2, color( 255, 0, 0 ) );
    this.yellow = new Light( x, y, this.size / 2, color( 255, 204, 0 ) );
    this.green = new Light( x, y + ( this.size * 0.66 ), this.size / 2, color( 0, 255, 0 ) );
  }

  update( state ) {
    if ( state[ 0 ] + state[ 1 ] + state[ 2 ] !== 1 ) {
      throw `Received incorrect state: [${state}]. Cannot activate more than one light at a time.`
    }
    this.state = state;
  }

  render() {
    push();
    fill( 191, 184, 0 );
    rectMode( CENTER );
    rect( this.x, this.y, this.size, this.size * 2 );
    pop();

    this.red.render( this.state[ 0 ] );
    this.yellow.render( this.state[ 1 ] );
    this.green.render( this.state[ 2 ] );
  }
}
