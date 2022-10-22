export interface Tile {
  svg: string;
  north: string;
  east: string;
  south: string;
  west: string;
}
export type Tiles = Tile[];

export interface Adjacent {
  tileId: number;
  north: number[];
  east: number[];
  south: number[];
  west: number[];
}
export type Adjacents = Adjacent[];

export interface EntropyCell {
  cellX: number;
  cellY: number;
  entropy: number;
}

export interface TileRemoval {
  cellX: number;
  cellY: number;
  tileId: number;
}

export enum Direction{
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}

export interface Neighbor {
  direction: Direction,
  row: number,
  col: number
}
export type Neighbors = Neighbor[]

export interface DataFile {
  cellSize: number,
  tiles: Tile[],
  frequencies: number[],
}
