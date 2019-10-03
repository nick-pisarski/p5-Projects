/**
 * Controls the toggling of walls, start, and end positions.
 */
function mouseClicked() {
  if ( grid.inBounds( mouseX, mouseY, true ) && keyIsPressed ) {
    const tile = grid.find( mouseX, mouseY, true );
    const pos = tile.position;
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

/**
 * Controls when a mouse is being Dragged, updates selectedTilePosition
 */
function mouseDragged() {
  if ( grid.inBounds( mouseX, mouseY, true ) && keyIsPressed && key == "w" ) {
    const currTile = grid.find( mouseX, mouseY, true );
    if ( currTile.position !== selectedTilePosition ) {
      currTile.data.wall = !currTile.data.wall;
      selectedTilePosition = currTile.position;
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
