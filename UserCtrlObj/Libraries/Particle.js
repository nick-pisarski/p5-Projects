class Particle {
  /**
   * Object that can be moved around the screen
   * @param {P5Vector} position - starting position of Particle
   * @param {*} options
   */
  constructor( position, options = {} ) {
    this.acceleration = options.acceleration || 0.025;
    this.coFriction = options.coFriction || -0.01;
    this.velocity = createVector( 0, 0 );
    this.position = position.copy();

    this.size = options.size || 20;

    this.strokeColor = options.stroke || color( 255 );
    this.strokeWidth = options.strokeWeight || 1;
    this.fillColor = options.fill || color( 200, 100 );
  }

  update( keys ) {
    const acceleration = keys.mult( this.acceleration );
    const friction = this.velocity.copy();
    friction.mult( this.coFriction );
    acceleration.add( friction );
    this.velocity.add( acceleration );

    this.position.add( this.velocity );
    this.checkBoundary();
  }

  setColor() {
    stroke( this.strokeColor );
    strokeWeight( this.strokeWidth );
    fill( this.fillColor );
  }

  checkBoundary() {
    if ( this.position.x < 0 ) {
      this.position.x = 0;
      this.velocity.mult( -1 );
    }
    if ( this.position.x > width ) {
      this.position.x = width;
      this.velocity.mult( -1 );

    }
    if ( this.position.y < 0 ) {
      this.position.y = 0;
      this.velocity.mult( -1 );

    }
    if ( this.position.y > height ) {
      this.velocity.mult( -1 );
      this.position.y = height;
    }
  }

  /**
   * Renders object as a circle
   */
  render() {
    this.setColor();
    translate( this.position.x, this.position.y )
    ellipse( 0, 0, this.size, this.size );
  }

  /**
   * Renders a triangle in the direction its heading
   */
  renderWithHeading() {
    this.setColor()
    const r = this.size / 2;
    push();
    translate( this.position.x, this.position.y );
    rotate( this.velocity.heading() + radians( 90 ) );
    beginShape( TRIANGLES );
    vertex( 0, -r * 2 );
    vertex( -r, r * 2 );
    vertex( r, r * 2 );
    endShape();
    pop();
  }
}
