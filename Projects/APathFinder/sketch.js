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
  frameRate( 25 );

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
      path.show( color( 0, 255, 0 ), 10 );

    } else {
      path.show();
    }
    if ( done != 0 ) noLoop();
  }
}

/**
 * Renders the tiles in the Grid
 */
function renderGrid() {
  grid.iterate( tile => {
    strokeWeight( 1 );
    stroke( 255 );
    noFill();

    const pos = tile.position();
    const size = tile.size();

    if ( tile.data.wall ) {
      fill( 127, 127, 127 );
    } else if ( pos === start ) {
      fill( 0, 200, 0 )
    } else if ( pos === end ) {
      fill( 200, 0, 0 )
    }

    rect( tile.x * size, tile.y * size, size, size );
  } )
}

/**
 * Controls the toggling of walls, start, and end positions.
 */
function mouseClicked() {
  if ( grid.inBounds( mouseX, mouseY, true ) && keyIsPressed ) {
    const tile = grid.find( mouseX, mouseY, true );
    const pos = tile.position();
    switch ( key ) {
    case "w":
      if ( pos !== end && pos !== start ) {
        tile.data.wall = !tile.data.wall || false;
      }
      break;
    case "s":
      if ( pos !== end ) { start = pos; }
      break;
    case "e":
      if ( pos !== start ) { end = pos; }
      break;
    default:
      break;
    }
    restart();
  }
}

function mouseDragged() {
  if ( grid.inBounds( mouseX, mouseY, true ) && keyIsPressed && key == "w" ) {
    const currTile = grid.find( mouseX, mouseY, true );
    if ( currTile.position() !== selectedTilePosition ) {
      currTile.data.wall = !currTile.data.wall;
      selectedTilePosition = currTile.position();
    }
  }
}

function mouseReleased() {
  selectedTile = null;
}

function restart() {
  path = new AStar( grid, ALLOW_DIAGONALS, DIST_CALC );
  renderGrid();
  loop();
}

function clearPath() {
  path = new AStar( grid, ALLOW_DIAGONALS, DIST_CALC );
  restart();
}

function clearWalls() {
  grid.iterate( tile => tile.data.wall = false );
  restart();
}

function reset() {
  start = null;
  end = null;
  clearWalls();
  clearPath();
  renderGrid();
  loop();
}
