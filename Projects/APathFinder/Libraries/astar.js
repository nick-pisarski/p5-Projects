class AStar {
  constructor( grid, allowDiagonal = false, distance = 'MANHATTAN' ) {
    this.grid = grid;
    this.lastCheckedNode = start;

    this.openSet = [];
    this.openSet.push( this.grid.list[ start ] );
    this.closedSet = [];
    this.distance = distance;
    this.allowDiagonal = allowDiagonal;
  }

  //function to determine score for two node
  heuristic( a, b ) {
    if ( this.distance === 'VISUAL' )
      return sqrt( abs( a.x - b.x ) + abs( a.y - b.y ) );
    return abs( a.x - b.x ) + abs( a.y - b.y )
  }

  // Function to delete element from the array
  removeFromArray( arr, elt ) {
    const index = arr.indexOf( elt );
    arr.splice( index, 1 );
  }

  path() {
    const path = [];
    var temp = this.lastCheckedNode;
    path.push( temp );
    while ( temp.data.previous ) {
      path.push( temp.data.previous );
      temp = temp.data.previous;
    }
    return path
  }

  step() {
    if ( this.openSet.length > 0 ) {
      let winner = 0;
      for ( let i = 1; i < this.openSet.length; i++ ) {
        const currentData = this.openSet[ i ].data;
        const winnerData = this.openSet[ winner ].data;
        if ( currentData.f < winnerData.f ) {
          winner = i;
        }

        if ( currentData.f === winnerData.f ) {
          if ( currentData.g > winnerData.g ) {
            winner = i;
          }
        }
      }

      let current = this.openSet[ winner ];
      this.lastCheckedNode = current;

      // Solution Found
      if ( current.position() === end ) { return 1; }

      this.removeFromArray( this.openSet, current );
      this.closedSet.push( current );

      //checking the neighbors and filtering out ones that are walls
      let neighbors = current.neighbors( this.allowDiagonal ).filter( n => !n.data.wall );

      neighbors.forEach( ( neighbor ) => {
        if ( !this.closedSet.includes( neighbor ) ) {

          var tempG = current.data.g + this.heuristic( current, neighbor );
          if ( !this.openSet.includes( neighbor ) ) {
            this.openSet.push( neighbor );
          } else if ( tempG >= neighbor.data.g ) {
            return;
          }
          neighbor.data.g = tempG;
          neighbor.data.h = this.heuristic( neighbor, this.grid.list[ end ] );
          neighbor.data.f = neighbor.data.g + neighbor.data.h;
          neighbor.data.previous = current;
        }
      } );

      return 0;
    } else {
      // No solution
      return -1;
    }
  }

  /**
   * show the current path
   * @param {color*} lineColor default = color( 255, 0, 200 )
   * @param {number*} lineThickness default = 2
   */
  show( lineColor = color( 255, 0, 200 ), lineThickness = 2 ) {
    const path = this.path();
    noFill();
    stroke( lineColor );
    strokeWeight( lineThickness );
    beginShape();
    for ( var i = 0; i < path.length; i++ ) {
      const p = path[ i ];
      vertex( p.size() * ( p.x + 0.5 ), p.size() * ( p.y + 0.5 ) );
    }
    endShape();
  }
}
