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
  cellId : number;
  entropy: number;
}

export interface TileRemoval {
  cellId: number;
  tileId: number;
}

export enum Direction{
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}
