let bg;
let cannon;

function preload() {
  bg = loadImage( 'assets/background.png' );
}

function setup() {
  const canvas = createCanvas( 800, 400 );
  canvas.parent( 'sketch' );
  cannon = new Cannon( 0, height, 200 );
  cannon.reload();
}

function draw() {
  background( bg );
  cannon.update();
  showStats();
}

function mouseClicked() {
  cannon.fire();
}

function keyPressed() {
  if ( keyCode === 82 ) {
    cannon.reload();
  }
}

function showStats() {
  fill( 255 );
  stroke( 127 )
  text( `Ammo: ${cannon.ammo_count}`, 25, 25 )
  if ( cannon.ammo_count < 1 ) {
    fill( 255, 0, 0 );
    stroke( 127, 0, 0 )
    text( 'RELOAD', 25, 50 )
  }
}

function createEntities() {
  for ( let i = 0; i < numEntities; i++ ) {
    entities.push( new Bomb( 0, height, 50, { stroke: color( random( 255 ), random( 255 ), random( 255 ) ) } ) )
  }
}

function updateEntities( callback ) {
  for ( let i = 0; i < numEntities; i++ ) {
    try {
      callback( entities[ i ] );
    } catch ( error ) {}
    entities[ i ].update();
    entities[ i ].shoot();
  }
}
