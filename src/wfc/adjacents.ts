import { Adjacents, Direction, Tile, Tiles } from "../types";

export const frequencies: number[] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

export const initAdjacents = (tiles: Tiles): Adjacents => {
  var adjacents: Adjacents = [];
  tiles.forEach((tile, i) => {
    const {north, east, south, west} = calcAdjacent(tiles, tile);

    adjacents.push({
      tileId: i,
      north: north,
      east: east,
      south: south,
      west: west,
    });
  });

  return adjacents;
}

export const calcAdjacent = (tiles: Tiles, tile: Tile): {north: number[], east: number[], south:number[], west: number[]} => {
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

  return {
    north: north,
    east: east,
    south: south,
    west: west,
  }
}

export const adjacentByTileAndDirection = (adjacents: Adjacents, tileId: number, direction: Direction): number[] => {
  switch(direction) {
    case Direction.NORTH: return adjacents[tileId].north;
    case Direction.EAST : return adjacents[tileId].east;
    case Direction.SOUTH: return adjacents[tileId].south;
    case Direction.WEST: return adjacents[tileId].west;
  }
}
