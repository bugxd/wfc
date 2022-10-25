export interface DataTile {
  svg: string;
  north: string;
  east: string;
  south: string;
  west: string;
  rotiationDegrees: number[];
  frequency: number;
}

export interface DataFile {
  cellSize: number,
  tiles: DataTile[],
}
