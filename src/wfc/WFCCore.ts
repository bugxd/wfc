import { EntropyCell, TileRemoval, Direction, Tiles, Adjacents, Neighbors } from './../types';
import { initAdjacents, adjacentByTileAndDirection } from './adjacents';
import Cell, { Grid } from './cell';
import NeighborsHelper from './neighbours';

class WFCCore {
  remainingUncollapsedCells: number = 0;

  grid: Grid = [];

  neighbors: NeighborsHelper;

  heap: EntropyCell[] = [];
  removal: TileRemoval[] = []; // tile ids
  adjacents: Adjacents = [];

  GRID_ROWS: number;
  GRID_COLS: number;

  constructor(tiles: Tiles, frequencies: number[], GRID_ROWS: number, GRID_COLS: number) {
    this.GRID_ROWS = GRID_ROWS;
    this.GRID_COLS = GRID_COLS;

    this.neighbors = new NeighborsHelper(GRID_ROWS, GRID_COLS);

    // init adjacents rules
    this.adjacents = initAdjacents(tiles);

    const possible = tiles.map((_, i) => i);
    for(var x = 0; x <= GRID_ROWS; x++) {
      var row = []

      for(var y = 0; y <= GRID_COLS; y++) {
        row.push(new Cell(this.remainingUncollapsedCells, y, x, [...possible], tiles, this.adjacents, frequencies));
        this.remainingUncollapsedCells++;
      }

      this.grid.push(row);
    }
  }

  nextStep(): Grid {
    this.updateHeap();
    const nextCell = this.heap.shift();

    if(nextCell) {
        const removedTiles = this.grid[nextCell.cellX][nextCell.cellY].collapse();
        removedTiles.forEach(tileId => this.removal.push({
          cellX: nextCell.cellX,
          cellY: nextCell.cellY,
          tileId: tileId,
        }));
        this.propagate();
    } else {
      // TODO: restart something went wrong
      throw Error("no next cell");
    }

    this.remainingUncollapsedCells--;
    return this.grid;
  }

  propagate() {
    while(this.removal.length > 0) {
      const removalUpdate = this.removal.pop();
      if(!removalUpdate) { return; }

      const cellX = removalUpdate.cellX;
      const cellY = removalUpdate.cellY;
      const tileId = removalUpdate.tileId;

      const neighbors = this.neighbors.getNeighbors(cellX, cellY);

      for(var i = 0; i < neighbors.length; i++) {
        const direction = neighbors[i].direction;
        const neighborX = neighbors[i].row;
        const neighborY = neighbors[i].col;

        const reverse = this.reverseDirection(direction);
        const neighbor = this.grid[neighborX][neighborY];

        const compatibleTiles = adjacentByTileAndDirection(this.adjacents, tileId, direction);
        if(compatibleTiles && !this.grid[neighborX][neighborY].collapsed) {
          for(var j = 0; j< compatibleTiles.length; j++) {
            const compatibleTile = compatibleTiles[j];

            const enablerCount = neighbor.tileEnablersByDirection(compatibleTile, reverse);

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
                if(this.grid[neighborX][neighborY]) {
                  this.grid[neighborX][neighborY].removePossible(compatibleTile);

                  if(this.grid[neighborX][neighborY].possible.length === 0){
                    this.remainingUncollapsedCells = 0;
                    throw new Error("fucked up");
                  }

                  this.removal.push({
                    cellX: neighborX,
                    cellY: neighborY,
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

  updateHeap() {
    var h: EntropyCell[] = [];
    for(var row: number = 0; row < this.GRID_ROWS; row++) {
      for(var col:number = 0; col < this.GRID_COLS; col++) {
        if(!this.grid[row][col].collapsed) {
          h.push({cellX: row, cellY: col, entropy: this.grid[row][col].entropy()})
        }
      }
    }

    this.heap = h.sort((a, b) => a.entropy - b.entropy);
  }
}

export default WFCCore;
