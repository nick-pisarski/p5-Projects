/**
 * Renders the tiles in the Grid
 */
function renderGrid() {
  grid.iterate( tileRenderer );
}

function tileRenderer( tile, showTileEdge = true ) {
  noFill();
  noStroke();

  if ( showTileEdge ) {
    strokeWeight( 1 );
    stroke( 0, 127, 0 );
    fill( 0, 95, 0 )
    rect( tile.x * tile.size, tile.y * tile.size, tile.size, tile.size );
  }

  if ( tile.position === start ) {
    renderTile( tile, color( 0, 200, 0 ) );
  } else if ( tile.position === end ) {
    renderTile( tile, color( 200, 0, 0 ) );
  } else if ( tile.data.wall ) {
    renderWall( tile );
  }
}

function renderWall( tile ) {
  const center = tile.center();
  const neighborWithWalls = tile.neighbors( ALLOW_DIAGONALS ).filter( n => n.data.wall );
  strokeWeight( 10 );
  stroke( 127, 127, 127 )
  neighborWithWalls.forEach( neighbor => {
    const neighCenter = neighbor.center();
    line( center.x, center.y, neighCenter.x, neighCenter.y );
  } )
}

function renderTile( tile, color = color( 255 ) ) {
  fill( color );
  ellipseMode( CORNER )
  ellipse( tile.x * tile.size, tile.y * tile.size, tile.size, tile.size );
}

function renderEnd( tile, color = color( 255, 0, 0 ) ) {
  fill( color );

}
