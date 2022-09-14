import { EntropyCell, TileRemoval, Direction, Tiles, Adjacents, Neighbors } from './../types';
import { initAdjacents, adjacentByTileAndDirection } from './adjacents';
import Cell, { Grid } from './cell';

class WFCCore {
  remainingUncollapsedCells: number = 0;

  grid: Grid = [];

  heap: EntropyCell[] = [];
  removal: TileRemoval[] = []; // tile ids
  adjacents: Adjacents = [];

  GRID_SIZE_X: number;
  GRID_SIZE_Y: number;

  constructor(tiles: Tiles, frequencies: number[], GRID_SIZE_X: number, GRID_SIZE_Y: number) {
    this.GRID_SIZE_X = GRID_SIZE_X;
    this.GRID_SIZE_Y = GRID_SIZE_Y;

    // init adjacents rules
    this.adjacents = initAdjacents(tiles);

    const possible = tiles.map((_, i) => i);
    for(var x = 0; x < GRID_SIZE_X; x++) {
      var row = []

      for(var y = 0; y < GRID_SIZE_Y; y++) {
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

      const neighbors = this.getNeighbors(cellX, cellY);

      for(var i = 0; i < neighbors.length; i++) {
        const direction = neighbors[i].direction;
        const neighborX = neighbors[i].x;
        const neighborY = neighbors[i].y;

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

  getNeighbors(x: number, y:number): Neighbors {
    var neighbors: Neighbors = [];

    if(x >= 1){
      neighbors.push({
        direction: Direction.NORTH,
        x: x - 1,
        y: y,
      });
    }

    if(x < this.GRID_SIZE_X){
      neighbors.push({
        direction: Direction.SOUTH,
        x: x + 1,
        y: y,
      });
    }

    if(y >= 1){
      neighbors.push({
        direction: Direction.WEST,
        x: x,
        y: y-1,
      });
    }

    if(y < this.GRID_SIZE_Y){
      neighbors.push({
        direction: Direction.EAST,
        x: x,
        y: y+1,
      });
    }

    return neighbors;
  }

  updateHeap() {
    var h: EntropyCell[] = [];
    for(var x: number = 0; x < this.GRID_SIZE_X; x++) {
      for(var y:number = 0; y < this.GRID_SIZE_Y; y++) {
        if(!this.grid[x][y].collapsed) {
          h.push({cellX: x, cellY: y, entropy: this.grid[x][y].entropy()})
        }
      }
    }

    this.heap = h.sort((a, b) => a.entropy - b.entropy);
  }
}

export default WFCCore;
