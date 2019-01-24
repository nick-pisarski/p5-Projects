const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const TILE_SIZE = 20;

let grid;

let start;
let end;

let pathfinder;

function setup() {
  const canvas = createCanvas( CANVAS_WIDTH, CANVAS_HEIGHT );
  canvas.parent( 'sketch' );
  frameRate( 5 );

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

  pathfinder = new AStar( grid, false, 'VISUAL' );

}

function draw() {
  background( 0 );
  renderGrid();

  if ( start && end ) {
    const done = pathfinder.step();

    pathfinder.drawPath();
    if ( done != 0 ) noLoop();

  }
}

function reset() {
  pathfinder = new AStar( grid, false, 'VISUAL' );
}

/**
 * Renders the tiles in the Grid
 */
function renderGrid() {
  grid.iterate( tile => {
    strokeWeight( 1 );
    stroke( 255 );
    noFill();
    if ( tile.data.wall ) {
      fill( 127, 127, 127 );
    } else if ( tile.position() === start ) {
      fill( 0, 200, 0 )
    } else if ( tile.position() === end ) {
      fill( 200, 0, 0 )
    }
    rect( tile.x * tile.size(), tile.y * tile.size(), tile.size(), tile.size() );
  } )
}

/**
 * Controls the toggling of walls, start, and end positions
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
      if ( pos !== end ) {
        start = pos;
      }
      break;
    case "e":
      if ( pos !== start ) {
        end = pos;
      }
      break;
    default:
      break;
    }
    loop();
    reset();
  }
}
