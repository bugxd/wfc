import { Direction, Neighbors } from "../types";

class NeighborsHelper {
  rows: number;
  cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  /**
   * get available neighbors for given position
   */
   getNeighbors(row: number, col:number): Neighbors {
     var neighbors: Neighbors = [];

     if(row >= 1){
       neighbors.push({
         direction: Direction.NORTH,
         row: row -1,
         col: col,
       });
     }

     if(row < this.rows){
       neighbors.push({
         direction: Direction.SOUTH,
         row: row +1,
         col: col,
       });
     }

     if(col >= 1){
       neighbors.push({
         direction: Direction.WEST,
         row: row,
         col: col -1,
       });
     }

     if(col < this.cols){
       neighbors.push({
         direction: Direction.EAST,
         row: row,
         col: col +1,
       });
     }

     return neighbors;
   }
}

export default NeighborsHelper;
