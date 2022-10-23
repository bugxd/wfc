import { Adjacents, Direction, TileEnablerCount, Tiles } from "../types";
import Cell from "./cell";
import cloneDeep from 'lodash.clonedeep';

class Grid {
  readonly rows: number;
  readonly cols: number;

  grid: Cell[][];

  readonly frequencies: number[];

  remainingUncollapsedCells: number;

  constructor(props: {rows: number, cols: number, tiles: Tiles, frequencies: number[], adjacents: Adjacents}) {
    this.rows = props.rows;
    this.cols = props.cols;
    this.grid = [];

    this.frequencies = props.frequencies;

    this.remainingUncollapsedCells = 0;

    let sumPossibleTileWeights: number = 0;
    let sumPossibleTileWeighsLogWeights: number = 0;

    // initial tile enabler count is the same for all cells
    const tileEnablerCounts: TileEnablerCount[] = [];
    // initial all tiles are possible
    const possibleTiles: number[] = [];

    props.tiles.forEach((_, i) => {
      // calculate weights
      const freq = props.frequencies[i]
      sumPossibleTileWeights += freq;
      sumPossibleTileWeighsLogWeights += freq*Math.log(freq);

      // calculate adjacents
      var adjacent = props.adjacents[i];
      tileEnablerCounts.push({
        tileId: i,
        north: adjacent.north.length,
        east: adjacent.east.length,
        south: adjacent.south.length,
        west: adjacent.west.length,
      });

      possibleTiles.push(i);
    });

    for(var r: number = 0; r < props.rows; r++) {
      const row: Cell[] = []

      for(var c: number = 0; c < props.cols; c++) {
        row.push(new Cell({
          row: r,
          col: c,
          possibleTiles: cloneDeep(possibleTiles),
          sumPossibleTileWeights: sumPossibleTileWeights,
          sumPossibleTileWeighsLogWeights: sumPossibleTileWeighsLogWeights,
          tileEnablerCounts: cloneDeep(tileEnablerCounts)
        }));
        this.remainingUncollapsedCells++;
      }

      this.grid.push(row);
    }
  }

  getGrid() {
    return this.grid;
  }

  getCell(row: number, col: number) {
    return this.grid[row][col];
  }

  removePossibleTiles(row: number, col: number, tileId: number, frequency: number) {
    this.grid[row][col].removePossibleTiles(tileId, frequency);
  }

  decreaseTileEnablersByDirection(row: number, col: number, tileId: number, direction: Direction) {
    this.grid[row][col].decreaseTileEnablersByDirection(tileId, direction);
  }

  collapseCell(row: number, col: number): number[] {
    this.remainingUncollapsedCells--;
    return this.grid[row][col].collapse(this.frequencies);
  }
}

export default Grid;
