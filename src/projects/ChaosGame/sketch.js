app.sketch = ( p ) => {

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
  let seedPoints = [];
  let rx, ry;
  let lastR;

  let numSidesSlider;
  let lerpFactorSlider;
  let cyclesPerFrameSlider;
  let framesBeforeRestartSlider;

  let shapeCreator;

  p.setup = function () {
    p.createCanvas( HEIGHT, WIDTH );

    shapeCreator = new ShapeCreator( p );
    set( SHAPE_SIDES );
    createControls();
  }

  p.draw = function () {
    // reset and draw a new one
    if ( cycle == framesBeforeRestartSlider.value() ) {
      set();
    }
    const cpf = cyclesPerFrameSlider.value();
    for ( let i = 0; i < cpf; i++ ) {
      let r = p.floor( p.random( seedPoints.length ) );
      while ( r == lastR ) {
        r = p.floor( p.random( seedPoints.length ) );
      }
      lastR = r;

      const pnt = seedPoints[ r ];
      const lf = lerpFactorSlider.value();
      rx = p.lerp( rx, pnt.x, lf );
      ry = p.lerp( ry, pnt.y, lf );
      p.stroke( pnt.c );
      p.point( rx, ry );
    }

    cycle++;
  }

  set = function ( sides ) {
    const shape = sides ? shapeCreator.createShapeVertices( sides ) :
      shapeCreator.createShapeVertices( numSidesSlider.value() );
    createPoints( shape );
    // createRandomPoints( 5 );
    cycle = 0;
  }

  createPoints = function ( shape ) {
    p.background( 0 );
    p.stroke( 255 );
    p.strokeWeight( POINT_SIZE );

    seedPoints = [];

    for ( let i = 0; i < shape.length; i++ ) {
      const x = shape[ i ].x;
      const y = shape[ i ].y;
      const c = p.color( p.random( 255 ), p.random( 255 ), p.random( 255 ) );
      seedPoints[ i ] = { x, y, c }
      if ( DISPLAY_SEED_PTS ) {
        p.strokeWeight( c );
        p.point( x, y );
      }

    }
    rx = p.random( p.width );
    ry = p.random( p.height );
  }

  createRandomPoints = function ( vertices ) {
    p.background( 0 )
    for ( let i = 0; i < vertices; i++ ) {
      const x = p.random( p.width );
      const y = p.random( p.height );
      const c = p.color( p.random( 255 ), p.random( 255 ), p.random( 255 ) );
      seedPoints[ i ] = { x, y, c }
      p.strokeWeight( c );
      p.point( x, y );
    }

    rx = p.random( p.width );
    ry = p.random( p.height );
  }

  createControls = function () {
    const container = p.createElement( 'div' );
    container.class( 'chaos control-container' );
    container.style( 'width', `${WIDTH}px` );

    numSidesSlider = makeSliderGroup( container, 'Start Points: ', 3, 10, SHAPE_SIDES, 1 );

    lerpFactorSlider = makeSliderGroup( container, 'Lerp Factor: ', 0.1, 1, LERP_FACTOR, 0.1 );

    cyclesPerFrameSlider = makeSliderGroup( container, 'Cycles Per Frame: ', 50, 500, CYCLES_PER_FRAME, 50 );

    framesBeforeRestartSlider = makeSliderGroup( container, 'Frames Before Restart: ', 50, 500, MAX_FRAMES, 50 );

  }

  makeSliderGroup = function ( parent, label, min, max, value, step ) {
    const container = p.createDiv();
    container.class( 'slider-container' );

    const lbl = p.createSpan( label );
    lbl.class( 'label' );
    lbl.parent( container );
    const slider = p.createSlider( min, max, value, step );
    const val = p.createSpan( `(${value})` );

    slider.mouseReleased( _ => {
      val.html( `(${slider.value()})` );
      set();
    } );
    slider.parent( container );

    val.parent( container );

    container.parent( parent );
    return slider;
  }

}
