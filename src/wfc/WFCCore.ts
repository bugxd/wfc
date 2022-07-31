import { EntropyCell, TileRemoval, Direction } from './../types';
import { tiles } from './tiles';
import { initAdjacents, adjacentByTileAndDirection } from './adjacents';
import Cell from './cell';

class WFCCore {
  remainingUncollapsedCells: number = 0;

  grid: Cell[] = [];
  heap: EntropyCell[] = [];
  removal: TileRemoval[] = []; // tile ids

  GRID_COUNT: number;

  constructor(width: number, height: number, GRID_COUNT: number, CELL_SIZE: number) {
    this.GRID_COUNT = GRID_COUNT;

    // init adjacents rules
    initAdjacents();

    const possible = tiles.map((_, i) => i);
    for(var x = 0; x < height; x+=CELL_SIZE) {
      for(var y = 0; y < width; y+=CELL_SIZE) {
        this.grid.push(new Cell(this.remainingUncollapsedCells, y, x, [...possible]));
        this.remainingUncollapsedCells++;
      }
    }
  }

  nextStep(): Cell[]{
    this.updateHeap();
    const nextCell = this.heap.shift();

    if(nextCell) {
        const removedTiles = this.grid[nextCell.cellId].collapse();
        removedTiles.forEach(tileId => this.removal.push({
          cellId: nextCell.cellId,
          tileId: tileId,
        }));
        this.propagate();
    } else {
      // TODO: restart something went wrong
      console.log("no next cell?");
      throw Error("no next cell");
    }

    this.remainingUncollapsedCells--;
    return this.grid;
  }

  propagate() {
    while(this.removal.length > 0) {
      const removalUpdate = this.removal.pop();
      if(!removalUpdate) { return; }

      console.log("removed from cell: " + removalUpdate.cellId + " tile: " + removalUpdate.tileId);

      const cellId = removalUpdate.cellId;
      const tileId = removalUpdate.tileId;

      const neighbors = this.getNeighbors(cellId);

      for(var i = 0; i < neighbors.length; i++) {
        const direction = neighbors[i].direction;
        const neighborId = neighbors[i].id;

        const reverse = this.reverseDirection(direction);
        const neighbor = this.grid[neighborId];

        const compatibleTiles = adjacentByTileAndDirection(tileId, direction);
        if(compatibleTiles && !this.grid[neighborId].collapsed) {
          for(var j = 0; j< compatibleTiles.length; j++) {
            const compatibleTile = compatibleTiles[j];

            const enablerCount = neighbor.tileEnablersByDirection(compatibleTile, reverse);

            console.log("check neighbor " + neighborId + " reverseDirection " + reverse + " compatibleTile " + compatibleTile + " enablerCount " + enablerCount);
            // check if we're about to decrement this to 0
            if(enablerCount === 1) {
              const ecNorth = neighbor.tileEnablersByDirection(compatibleTile, Direction.NORTH);
              const ecEast = neighbor.tileEnablersByDirection(compatibleTile, Direction.EAST);
              const ecSouth = neighbor.tileEnablersByDirection(compatibleTile, Direction.SOUTH);
              const ecWest = neighbor.tileEnablersByDirection(compatibleTile, Direction.WEST);

              // if there is a zero count in another direction,
              // the potential tile has already been removed,
              // and we want to avoid removing it again
              if(!(ecNorth <= 0 || ecEast <= 0 || ecSouth <= 0 || ecWest <= 0)) {
                if(this.grid[neighborId]) {
                  this.grid[neighborId].removePossible(compatibleTile);

                  if(this.grid[neighborId].possible.length === 0){
                    console.log(this.grid[neighborId]);
                    console.error("fucked up");
                    throw new Error("fucked up");
                  }

                  this.removal.push({
                    cellId: neighborId,
                    tileId: compatibleTile,
                  });
                }
              }
            }
            neighbor.decreaseTileEnablersByDirection(compatibleTile, reverse);
          }
        }
      }
    }
  }

  reverseDirection(direction: Direction): Direction {
    switch(direction) {
      case Direction.NORTH: return Direction.SOUTH;
      case Direction.EAST : return Direction.WEST;
      case Direction.SOUTH: return Direction.NORTH;
      case Direction.WEST: return Direction.EAST;
    }
  }

  getNeighbors(cellId: number): {direction: Direction, id: number}[] {
    var neighbors: {direction: Direction, id: number}[] = [];

    if(!(cellId < this.GRID_COUNT)) {
      neighbors.push({
        direction: Direction.NORTH,
        id: cellId - this.GRID_COUNT,
      });
    }

    if(!(cellId % this.GRID_COUNT === this.GRID_COUNT-1)) {
      neighbors.push({
        direction: Direction.EAST,
        id: cellId + 1,
      });
    }

    if(!(cellId + this.GRID_COUNT > (this.GRID_COUNT * this.GRID_COUNT)-1)) {
      neighbors.push({
        direction: Direction.SOUTH,
        id: cellId + this.GRID_COUNT,
      });
    }

    if(!(cellId % this.GRID_COUNT === 0)) {
      neighbors.push({
        direction: Direction.WEST,
        id: cellId - 1,
      });
    }

    return neighbors;
  }

  updateHeap() {
    const h = [...this.grid
      .filter((cell: Cell)=> !cell.collapsed)
      .map((cell: Cell) => ({cellId: cell.id, entropy: cell.entropy()}))
    ];

    this.heap = h.sort((a, b) => a.entropy - b.entropy);
  }
}

export default WFCCore;
