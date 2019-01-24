class AStar {
  constructor( grid, allowDiagonal = false, distance = 'MAN' ) {
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
    if ( this.disatnce === 'VISUAL' )
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

      //check if its the end
      if ( current.position() === end ) {
        console.log( 'Done!' );
        return 1;
      }

      this.removeFromArray( this.openSet, current );
      this.closedSet.push( current );

      //checking the neighbors
      const neighbors = current.neighbors( this.allowDiagonal );

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
      console.log( 'No Solution' );
      return -1;
    }
  }

  drawPath() {
    // Drawing path as continuous live
    const path = this.path();
    noFill();
    stroke( 255, 0, 200 );
    strokeWeight( 2 );
    beginShape();
    for ( var i = 0; i < path.length; i++ ) {
      const p = path[ i ];
      const s = p.size();
      vertex( p.x * s + ( s / 2 ), p.y * s + ( s / 2 ) );
    }
    endShape();
  }
}
