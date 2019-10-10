// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Boid {
  constructor( name, maxForce = 0.1, maxSpeed = 2 ) {
    this.name = name;
    this.position = createVector( random( width ), random( height ) );
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag( random( -4, 4 ) );
    this.acceleration = createVector();
    // configurationss
    this.maxForce = maxForce;
    this.maxSpeed = maxSpeed;
  }

  // Alignment
  align( boids ) {
    let steering = createVector();

    if ( !boids || !boids.length ) return steering;

    for ( let other of boids ) {
      steering.add( other.velocity );
    }
    steering.div( boids.length );

    steering.setMag( this.maxSpeed );
    steering.sub( this.velocity );
    steering.limit( this.maxForce );

    return steering.mult( alignSlider.value() );
  }

  // Cohesion
  cohesion( boids ) {
    let steering = createVector();

    if ( !boids || !boids.length ) return steering;

    for ( let other of boids ) {
      steering.add( other.position );
    }
    steering.div( boids.length );
    steering = this.seek( steering );
    return steering.mult( cohesionSlider.value() );

  }

  // Separation
  separation( boids ) {
    let steering = createVector();

    if ( !boids || !boids.length ) return steering;

    for ( let other of boids ) {
      let diff = p5.Vector.sub( this.position, other.position );
      diff.div( this.distance( other ) );
      steering.add( diff );
    }
    steering.div( boids.length );

    if ( steering.mag() > 0 ) {
      steering.setMag( this.maxSpeed );
      steering.sub( this.velocity );
      steering.limit( this.maxForce );
    }

    return steering.mult( separationSlider.value() );
  }

  // Seek
  seek( target ) {
    // Desired = target - velocity
    const desired = p5.Vector.sub( target, this.position );
    desired.setMag( this.maxSpeed );
    // Steering = Desired minus Velocity
    const steer = p5.Vector.sub( desired, this.velocity );
    steer.limit( this.maxForce ); // Limit to maximum steering force
    return steer;
  }

  handleEdges() {
    if ( this.position.x > width ) this.position.x = 0;
    if ( this.position.x < 0 ) this.position.x = width;
    if ( this.position.y > height ) this.position.y = 0;
    if ( this.position.y < 0 ) this.position.y = height;
  }

  flock( boids ) {
    let neighbors = this.getNeighborBoids( boids );

    const alignment = this.align( neighbors );
    const cohesion = this.cohesion( neighbors );
    const separation = this.separation( neighbors );

    this.acceleration.add( alignment );
    this.acceleration.add( cohesion );
    this.acceleration.add( separation );
  }

  update( boids ) {
    this.handleEdges();

    this.flock( boids );

    this.velocity.add( this.acceleration );
    this.velocity.limit( this.maxSpeed );
    this.position.add( this.velocity );
    this.acceleration.mult( 0 );
  }

  render() {
    //figure out r better
    const r = 8;
    const theta = this.velocity.heading() + radians( 90 );

    fill( 200, 100 );
    stroke( 255 );
    push();
    translate( this.position.x, this.position.y );
    rotate( theta );
    beginShape( TRIANGLES );
    vertex( 0, -r * 2 );
    vertex( -r, r * 2 );
    vertex( r, r * 2 );
    endShape();
    pop();

    if ( showPerception ) this.renderPerception();
    if ( showPosition ) this.renderPosition();
    if ( showCenter ) this.renderCenter();
    if ( showName ) this.renderName();
  }

  renderCenter() {
    push();
    strokeWeight( 2 );
    stroke( 0, 255, 0 );
    point( this.position.x, this.position.y );
    pop();
  }

  renderPosition() {
    push();
    stroke( 255, 0, 0 );
    text( `[ ${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)} ]`, this.position.x, this.position.y );
    pop();
  }

  renderName() {
    push();
    stroke( 255, 255, 0 );
    text( this.name, this.position.x, this.position.y );
    pop();
  }

  renderPerception() {
    push();
    strokeWeight( 1 );
    stroke( 0, 255, 0 );
    noFill()
    ellipseMode( CENTER )
    ellipse( this.position.x, this.position.y, perceptionRange, perceptionRange );
    pop();
  }

  getNeighborBoids( boids ) {
    // create a range
    const range = new Circle( this.position.x, this.position.y, perceptionRange );
    let neighbors = boidTree.query( range );
    // neighbors = neighbors.filter( boid => this.isDifferentBoid( boid ) );

    const bs = boids.filter( boid => {
      return this.isDifferentBoid( boid ) && this.isInRange( boid );
    } );

    // console.log( `Current:  ${this.name} [${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)}]` );
    // console.log( `N${neighbors.length} === B${bs.length} : ${neighbors === bs}` );
    return bs;
  }

  isDifferentBoid( boid ) {
    return this !== boid;
  }

  isInRange( boid ) {
    return this.distance( boid ) <= perceptionRange;
  }

  distance( boid ) {
    return this.position.dist( boid.position );
  }
}
