// Dropping Balls
class Ball {

  constructor( p5, x, y, r, gravity ) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.r = r;
    this.gravity = gravity;
    this.on_screen = true;
  }

  radius() {
    return this.r;
  }

  getColor = val => this.p5.map( val, 0, this.p5.width, 0, 255 );

  show() {
    const i = this.getColor( this.x );
    const j = this.getColor( this.y );
    const r = this.radius();
    this.p5.stroke( i, j, 255 );
    this.p5.fill( i, j, 255 );
    this.p5.ellipse( this.x, this.y, r, r );
  }

  update() {
    if ( this.on_screen ) {
      if ( this.y < this.p5.height && this.x < this.p5.width ) {
        this.y += this.gravity + this.p5.random( 0, 3 );
        this.y += this.gravity + Math.floor( Math.random() * 3 );
        this.show();
      } else {
        this.on_screen = false;
      }
    }
  }
}

class ShrinkingBall extends Ball {
  constructor( p5, x, y, radius, gravity ) {
    const r = radius || 20
    super( p5, x, y, r, gravity )
  }

  radius() {
    this.r *= 0.99;
    return this.r;
  }

  update() {
    if ( this.r > 2 ) {
      if ( this.y >= this.p5.height ) {
        this.y = 0;
        this.x = this.p5.random( 0, this.p5.width );
      } else {
        this.y += this.gravity + this.p5.random( 0, 3 );
      }
      this.show();
    } else {
      this.on_screen = false;
    }
  }
}
