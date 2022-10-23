import { Adjacents, Direction, EntropyCell, TileCell, TileRemoval, Tiles } from "../types";
import { adjacentByTileAndDirection } from "./adjacents";
import Grid from "./grid";
import Heap from "./heap";
import NeighborsHelper from "./neighbours";

class Wfc {
  grid: Grid;
  adjacents: Adjacents = [];
  heap: Heap<EntropyCell>;
  neighbors: NeighborsHelper;
  tiles: Tiles;
  frequencies: number[];

  removedTiles: TileRemoval[];

  constructor(props: {
    gridRows: number,
    gridCols: number,
    tiles: Tiles,
    adjacents: Adjacents,
    frequencies: number[]
  }) {
    this.adjacents = props.adjacents;
    this.heap = new Heap<EntropyCell>();
    this.neighbors = new NeighborsHelper(props.gridRows -1, props.gridCols -1);
    this.tiles = props.tiles;
    this.frequencies = props.frequencies;
    this.removedTiles = [];
    this.grid = new Grid({
      rows: props.gridRows,
      cols: props.gridCols,
      tiles: props.tiles,
      frequencies: props.frequencies,
      adjacents: this.adjacents});
  }

  mapGrid(): TileCell[][] {
    return this.grid.getGrid().map((row, r) =>
      row.map((col, c) => ({
          row: r,
          col: c,
          svg: col.selectedTileId !== -1 ? this.tiles[col.selectedTileId].svg : undefined,
          possible: col.possibleTiles.length,
        })
      )
    )
  }

  nextStep(): TileCell[][] {
    this.updateHeap();
    const nextCell = this.heap.pop();

    if(nextCell) {
      const tiles = this.grid.collapseCell(nextCell.row, nextCell.col);

      tiles.forEach(tile => this.removedTiles.push({
        row: nextCell.row,
        col: nextCell.col,
        tileId: tile,
      }));

      this.propagate();
    } else {
      // TODO: restart something went wrong
      throw Error("no next cell");
    }

    return this.mapGrid();
  }

  propagate() {
    while(this.removedTiles.length > 0) {
      const removalUpdate = this.removedTiles.pop();
      if(!removalUpdate) { return; }

      const cellX = removalUpdate.row;
      const cellY = removalUpdate.col;
      const tileId = removalUpdate.tileId;

      const neighbors = this.neighbors.getNeighbors(cellX, cellY);

      for(var i = 0; i < neighbors.length; i++) {
        const direction = neighbors[i].direction;
        const neighborRow = neighbors[i].row;
        const neighborCol = neighbors[i].col;

        const reverse = this.reverseDirection(direction);
        const neighbor = this.grid.getCell(neighborRow, neighborCol);

        const compatibleTiles = adjacentByTileAndDirection(this.adjacents, tileId, direction);

        if(!neighbor.collapsed) {
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
                //this.grid[neighborX][neighborY].removePossible(compatibleTile);
                const frequency = this.frequencies[compatibleTile];
                this.grid.removePossibleTiles(neighborRow, neighborCol, compatibleTile, frequency);
                if(this.grid.grid[neighborRow][neighborCol].possibleTiles.length === 0){
                  this.grid.remainingUncollapsedCells = 0;
                  throw new Error("fucked up");
                }

                this.removedTiles.push({
                  row: neighborRow,
                  col: neighborCol,
                  tileId: compatibleTile,
                });
              }
            }
            neighbor.decreaseTileEnablersByDirection(compatibleTile, reverse);
          }
        }
      }
    }
  }

  remainingUncollapsedCells() {
    return this.grid.remainingUncollapsedCells;
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
    this.heap.clear();
    const grid = this.grid.getGrid();

    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if(!cell.collapsed) {
          this.heap.push({row: r, col: c, entropy: cell.entropy()})
        }
      })
    });

    this.heap.order((a, b) => a.entropy - b.entropy);
  }
}

export default Wfc;
