let lightManager;

let roads = [];

function setup() {
  frameRate( 60 );
  const canHeight = 800;
  const canWidth = 800;
  const canvas = createCanvas( canWidth, canHeight );
  canvas.parent( 'sketch' );

  lightManager = new LightManager( new TrafficLight( 50, 75, 50 ), new TrafficLight( 700, 75, 50 ) );

  for ( let i = 0; i < 8; i++ ) {
    const height = ( canHeight / 8 ) * i + 50;
    roads.push( new RoadSegment( height, canWidth / 2, 100 ) );
  }
}

function draw() {
  background( 0, 127, 0 );

  lightManager.tick();

  roads.forEach( r => r.render() );
}
