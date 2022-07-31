import { Adjacents, Direction } from "../types";
import { tiles } from "./tiles";

export var adjacents: Adjacents = [];

export const frequencies: number[] = [0.2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

export const initAdjacents = () => {
  adjacents = [];
  tiles.forEach((tile, i) => {
    var north: number[] = [];
    var east: number[] = [];
    var south: number[] = [];
    var west: number[] = [];

    // find north
    tiles.forEach((atile, i) => {
      // find norh
      if(tile.north === atile.south){
        north.push(i);
      }

      // find east
      if(tile.east === atile.west){
        east.push(i);
      }

      // find south
      if(tile.south === atile.north){
        south.push(i);
      }

      // find west
      if(tile.west === atile.east){
        west.push(i);
      }
    });

    adjacents.push({
      tileId: i,
      north: north,
      east: east,
      south: south,
      west: west,
    });
  });

  console.log(adjacents);
}

export const adjacentByTileAndDirection = (tileId: number, direction: Direction): number[] => {
  switch(direction) {
    case Direction.NORTH: return adjacents[tileId].north;
    case Direction.EAST : return adjacents[tileId].east;
    case Direction.SOUTH: return adjacents[tileId].south;
    case Direction.WEST: return adjacents[tileId].west;
  }
}
