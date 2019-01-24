class Tile {
  constructor( x, y, size, position ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.position = position
    this.data = {}
  }

  getData() {
    return this.data;
  }

  setData( data ) {
    this.data = data;
  }

  render() {
    stroke( 255 );
    strokeWeight( 1 );
    noFill();
    rect( this.x * this.size, this.y * this.size, this.size, this.size );
  }
}

class Grid {
  /**
   * Stores 2D data in a 1D array - Used for storing tiles on canvas
   * @param {number} canvasWidth - width of canvas
   * @param {number} canvasHeight - height of canvas
   * @param {number} tileSize - size of tiles
   */
  constructor( canvasWidth, canvasHeight, tileSize ) {
    this.list = [];
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.width = canvasWidth / tileSize;
    this.height = canvasHeight / tileSize;
    this.tileSize = tileSize;

    this.build();
  }

  /**
   * clears the list
   */
  clear() {
    this.list = [];
  }

  /**
   * Builds the grid with Tile objects
   */
  build() {
    for ( let r = 0; r < this.height; r++ ) {
      for ( let c = 0; c < this.width; c++ ) {
        this.list.push( new Tile( c, r, tileSize, c + ( r * this.width ) ) )
      }
    }
  }

  /**
   * Finds data in the array based on x,y coords
   * @param {number} x x coord can be col value or pixel value
   * @param {number} y y coord can be col value or pixel value
   * @param {boolean*} pixel default: false, weather is pixel data or row and column data
   */
  find( x, y, pixel = false ) {
    const i = this.getI( x, y, pixel );
    return i > this.list.length - 1 ? null : this.list[ i ];

  }

  /**
   * Calculates the position in the array based on x,y coords
   * @param {number} x x coord can be col value or pixel value
   * @param {number} y y coord can be col value or pixel value
   * @param {boolean*} pixel default: false, weather is pixel data or row and column data
   */
  getI( x, y, pixel = false ) {
    if ( pixel ) {
      return Math.trunc( x / this.tileSize ) + ( Math.trunc( y / this.tileSize ) * this.width )
    }
    return x + ( y * this.width )
  }

  /**
   * Checks if the given coordinates are in the grid
   * @param {number} x x coord can be col value or pixel value
   * @param {number} y y coord can be col value or pixel value
   * @param {boolean*} pixel default: false, weather is pixel data or row and column data
   */
  inBounds( x, y, pixel = false ) {
    if ( pixel ) {
      return x < this.canvasWidth && x > 0 && y > 0 && y < this.canvasHeight;
    }
    return x < this.width && x > 0 && y > 0 && y < this.height;
  }

  iterate( callback ) {
    this.list.forEach( tile => callback( tile ) );
  }
}
