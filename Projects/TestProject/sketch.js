const canHeight = 800;
const canWidth = 800;
const tileSize = 80;

let grid;

function setup() {
  const canvas = createCanvas( canWidth, canHeight );
  canvas.parent( 'sketch' );

  grid = new Grid( canWidth, canHeight, tileSize );
  grid.iterate( tile => { tile.data.wall = false } );

}

function draw() {
  background( 0 );
  grid.iterate( tile => {
    strokeWeight( 1 );
    stroke( 255 );
    noFill();
    if ( tile.data.wall ) {
      fill( 63, 63, 63 );
    } else if ( tile.data.start ) {
      fill( 0, 200, 0 )
    } else if ( tile.data.end ) {
      fill( 200, 0, 0 )
    }
    rect( tile.x * tile.size(), tile.y * tile.size(), tile.size(), tile.size() );

  } )
}

function mouseClicked( event ) {
  if ( grid.inBounds( mouseX, mouseY, true ) && keyIsPressed ) {
    const tile = grid.find( mouseX, mouseY, true );
    switch ( key ) {
    case "w":
      tile.data.wall = !tile.data.wall || false;
      break;
    case "s":
      tile.data.start = !tile.data.start || false;
      break;
    case "e":
      tile.data.end = !tile.data.end || false;
      break;
    default:
      break;
    }
  }
}
