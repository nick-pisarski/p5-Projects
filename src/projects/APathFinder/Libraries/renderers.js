/**
 * Renders the tiles in the Grid
 */
function renderGrid() {
  // BACKGROUND
  grid.iterate( renderTile );

  // WALLS - Iterates through all tiles to find walls, could clean up to store list of walls in a seperate list
  // to ease rendering strain
  grid.iterate( renderWall );

  // START
  if ( start )
    renderStart( grid.get( start ), color( 0, 200, 0 ) );
  // END
  if ( end )
    renderEnd( grid.get( end ) );

}

function renderTile( tile ) {
  strokeWeight( 1 );
  stroke( 0, 127, 0 );
  noFill();
  rect( tile.x * tile.size, tile.y * tile.size, tile.size, tile.size );
}

function renderWall( tile ) {
  if ( tile.data.wall ) {
    const center = tile.center();
    const neighborWithWalls = tile.neighbors( n => n.data.wall, ALLOW_DIAGONALS );
    const weight = tile.size * 0.6;
    strokeWeight( weight );
    stroke( 127, 127, 127 );
    // draw connections to walls
    neighborWithWalls.forEach( neighbor => {
      const neighCenter = neighbor.center();
      line( center.x, center.y, neighCenter.x, neighCenter.y );
    } )

    //no connects, then just draw a point
    if ( !neighborWithWalls.length ) {
      point( center.x, center.y )
    }
  }
}

function renderEnd( tile, strokeColor = color( 200, 0, 0 ) ) {
  const coords = tile.coordinates();
  const weight = max( 1, tile.size * 0.25 )
  stroke( strokeColor );
  strokeWeight( weight );
  line( coords.x, coords.y, coords.x + tile.size, coords.y + tile.size );
  line( coords.x, coords.y + tile.size, coords.x + tile.size, coords.y );
}

function renderStart( tile, strokeColor = color( 0, 200, 0 ) ) {
  const weight = max( 1, tile.size * 0.25 )
  stroke( strokeColor );
  strokeWeight( weight );
  noFill();
  ellipseMode( CORNER );
  ellipse( tile.x * tile.size, tile.y * tile.size, tile.size, tile.size );
}
