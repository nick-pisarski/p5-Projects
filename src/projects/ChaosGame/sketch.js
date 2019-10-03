// Window - window is always a square
const HEIGHT = 800;
const WIDTH = HEIGHT;

// config
const DISPLAY_SEED_PTS = false;
let MAX_FRAMES = 500;
let CYCLES_PER_FRAME = 500;
let LERP_FACTOR = 0.5;
let SHAPE_SIDES = 5;
let POINT_SIZE = 1;

let cycle = 0;
const seedPoints = [];
let rx, ry;
let shape;
let lastR;

function setup() {
  const canvas = createCanvas( HEIGHT, WIDTH );
  canvas.parent( 'sketch' );
  shape = createShapeVertices( SHAPE_SIDES );
  createPoints( shape );

  // Create HTML Elements
  createControls()

}

function draw() {

  // reset and draw a new one
  if ( cycle == MAX_FRAMES ) {
    createPoints( shape );
    cycle = 0;
  }

  for ( let i = 0; i < CYCLES_PER_FRAME; i++ ) {

    let r = floor( random( seedPoints.length ) );
    while ( r == lastR ) {
      r = floor( random( seedPoints.length ) );
    }
    lastR = r;

    const p = seedPoints[ r ];
    rx = lerp( rx, p.x, LERP_FACTOR );
    ry = lerp( ry, p.y, LERP_FACTOR );
    stroke( p.c );
    point( rx, ry );
  }

  cycle++;
}

function createPoints( shape ) {
  background( 0 );
  stroke( 255 );
  strokeWeight( POINT_SIZE );

  for ( let i = 0; i < shape.length; i++ ) {
    const x = shape[ i ].x;
    const y = shape[ i ].y;
    const c = color( random( 255 ), random( 255 ), random( 255 ) );
    // const c = color(255, 255, 255);
    seedPoints[ i ] = { x, y, c }
    if ( DISPLAY_SEED_PTS ) {
      strokeWeight( c );
      point( x, y );
    }

  }
  rx = random( width );
  ry = random( height );
}

function createRandomPoints( vertices ) {
  background( 0 )
  for ( let i = 0; i < vertices; i++ ) {
    const x = random( width );
    const y = random( height );
    const c = color( random( 255 ), random( 255 ), random( 255 ) );
    seedPoints[ i ] = { x, y, c }
    strokeWeight( c );
    point( x, y );
  }

  rx = random( width );
  ry = random( height );
}

function createControls() {
  const container = createElement( 'div' );
  container.class( 'control-container' );
  container.position( 0, height );
  container.style( 'width', `${WIDTH}px` );

  // const title = createElement('h3', 'Controls: ');
  // title.parent(container);

  const numSides = makeSliderGroup( 'Start Points: ', 3, 10, SHAPE_SIDES, 1 );
  numSides.parent( container );

  const lerpFactor = makeSliderGroup( 'Lerp Factor: ', 0.1, 1, LERP_FACTOR, 0.1 );
  lerpFactor.parent( container );

  const cyclesPerFrame = makeSliderGroup( 'Cycles Per Frame: ', 50, 500, CYCLES_PER_FRAME, 50 );
  cyclesPerFrame.parent( container );

  const framesBeforeRestart = makeSliderGroup( 'Frames Before Restart: ', 50, 500, MAX_FRAMES, 50 );
  framesBeforeRestart.parent( container );

}

function makeSliderGroup( label, min, max, value, step ) {
  const container = createDiv();
  container.class( 'slider-container' );

  const lbl = createSpan( label );
  lbl.class( 'label' );
  lbl.parent( container );
  const slider = createSlider( min, max, value, step );
  slider.parent( container );

  const val = createSpan( `(${value})` );
  val.parent( container );

  return container
}
