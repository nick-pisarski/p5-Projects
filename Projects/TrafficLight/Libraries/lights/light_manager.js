class LightManager {
  constructor( light1, light2, fps = 60 ) {
    this.lights = [ light1, light2 ];
    this.fps = fps;
    this.frame = 1;
    this.state = [ 1, 0, 0 ];
  }

  getState() {

    switch ( this.frame ) {
    case 0:
      this.state = [ 0, 0, 1 ];
      break;
    case 10:
      this.state = [ 0, 1, 0 ];
      break;
    case 40:
      this.state = [ 1, 0, 0 ];
      break;
    }
    return this.state;
  }

  tick() {
    let state = this.getState();
    this.lights.forEach( light => {
      light.update( state );
      light.render();
    } );

    this.frame = ( this.frame + 1 ) % this.fps;
  }
}
