class Cannon {
  constructor( x, y, ammo_capacity = 3 ) {

    this.position = createVector( x, y );
    this.barrel = new Barrel( this.position.x + 25, this.position.y - 25 );
    this.power = 1;
    this.ammo_capacity = ammo_capacity;
    this.ammo = [];
    this.add_ammo( this.ammo_capacity );
    this.ammo_count = this.ammo.length;
  }

  add_ammo( amount ) {
    this.ammo_count += amount
  }

  reload() {
    this.add_ammo( this.ammo_capacity - this.ammo_count );
    this.ammo_count = this.ammo_capacity;
  }

  fire() {
    if ( !this.ammo_count < 1 ) {
      let bomb = new Bomb( this.barrel.end.x, this.barrel.end.y );
      const firepower = createVector( this.barrel.end.x, this.barrel.end.y );
      // firepower.mag( this.power );
      console.log( 'Fire', firepower );
      firepower.heading( this.barrel.heading() );
      bomb.shoot( firepower );
      this.ammo.unshift( bomb );
      this.ammo_count--;
    } else {
      print( 'Ammo Empty! RELOAD' );
    }
  }

  update() {
    for ( let i = this.ammo.length - 1; i > -1; i-- ) {
      this.ammo[ i ].update();
      if ( this.ammo[ i ].destroyed ) {
        this.ammo.splice( i );
      }
    }
    this.render();
    this.barrel.update();
  }

  render() {
    stroke( 255, 0, 255 );
    strokeWeight( 1 );
    fill( 0, 255, 0 )
    rect( this.position.x, this.position.y - 25, 25, 25 );
  }

}

class Barrel {
  constructor( x, y ) {
    this.position = createVector( x, y );
    this.mPos = createVector( mouseX - this.position.x, mouseY - this.position.y )
    this.length = 35;
  }

  update() {
    this.mPos = createVector( mouseX - this.position.x, mouseY - this.position.y );
    this.end = this.position.copy().add( this.angle );
    this.render();
  }

  heading() {
    return this.mPos.heading();
  }

  render() {
    this.angle = this.mPos.copy().normalize().mult( this.length );

    push()
    stroke( 127 );
    strokeWeight( 4 );
    translate( this.position.x, this.position.y );
    line( 0, 0, this.angle.x, this.angle.y );
    // text( `x:${Math.round(this.angle.x)}, y:${Math.round(this.angle.y)}`, this.angle.x, this.angle.y );
    rotate( this.heading() );
    pop()

  }

}
