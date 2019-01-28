const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const TILE_SIZE = 20;

// Calculate distance via 'VISUAL' distance or 'MANHATTAN'. VISUAL calculates using sqrt.
const DIST_CALC = 'VISUAL';
// const DIST_CALC = 'MANHATTAN';

// Should check diagonals
const ALLOW_DIAGONALS = true;

// Grid to store map data
let grid;

// Postions of the current start and end
let start;
let end;

//Store the A* Path object
let path;

// stores the currently selectedTile position while mouse is being dragged
let selectedTilePosition;

function setup() {
  const canvas = createCanvas( CANVAS_WIDTH, CANVAS_HEIGHT );
  canvas.parent( 'sketch' );
  frameRate( 60 );

  // Create grid and populate with necessary data
  grid = new Grid( CANVAS_WIDTH, CANVAS_HEIGHT, TILE_SIZE );
  grid.iterate( tile => {
    tile.data = {
      f: 0,
      g: 0,
      h: 0,
      vh: 0,
    }
  } )

  path = new AStar( grid, ALLOW_DIAGONALS, DIST_CALC );
}

function draw() {
  background( 0 );
  renderGrid();

  // Must have start and end points to calculate path
  if ( start && end ) {
    const done = path.step();

    if ( done == 1 ) {
      path.show( color( 0, 182, 0 ), 6 );

    } else {
      path.show();
    }
    if ( done != 0 ) noLoop();
  }
}
