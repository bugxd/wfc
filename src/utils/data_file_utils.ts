import { Tile, Tiles } from "../types";
import { DataFile, DataTile } from "../types/data_file_types";

export function toDataFile(props: {cellSize: number, tiles: Tiles, frequencies: number[]}): DataFile {
  const tileMap = new Map<string, Tile[]>();

  // find same tiles and add to tile map
  for(var i = 0; i < props.tiles.length; i++) {
    const tile = props.tiles[i];

    if(tileMap.has(tile.uid))
      tileMap.set(tile.uid, [...tileMap.get(tile.uid)!, tile]);
    else
      tileMap.set(tile.uid, [tile]);
  }

  const dataTiles : DataTile[] = [];

  // make one tile out of the same tiles
  tileMap.forEach((tiles: Tile[]) => {
    tiles.sort((a,b) => a.rotiationDegree - b.rotiationDegree);

    const zeroDegreeTile = tiles.shift();

    if(zeroDegreeTile) {
      // get frequency for tile
      let frequency = 0;
      const id = props.tiles.findIndex((t: Tile) => t.uid === zeroDegreeTile.uid);
      console.log(zeroDegreeTile.uid+ " " + id);
      if(id !== -1)
        frequency = props.frequencies[id];

      dataTiles.push({
        svg: zeroDegreeTile.svg,
        north: zeroDegreeTile.north,
        east: zeroDegreeTile.east,
        south: zeroDegreeTile.south,
        west: zeroDegreeTile.west,
        rotiationDegrees: [0, ...tiles.map(t => t.rotiationDegree)],
        frequency: frequency,
      });
    }
  });

  return {
    cellSize: props.cellSize,
    tiles: dataTiles,
  };
}

export function fromDataFile(content: string): {cellSize: number, tiles: Tiles, frequencies: number[]} {
  let cellSize: number = 0;
  const tiles:Tiles = [];
  let frequencies: number[] = [];

  const dataContent = JSON.parse(content) as DataFile;

  // test for completness
  if(!dataContent.cellSize) throw new Error("[fromDataFile]: missing cell size");
  if(!dataContent.tiles) throw new Error("[fromDataFile]: missing tiles");

  cellSize = dataContent.cellSize;
  for(var i = 0; i < dataContent.tiles.length; i++) {
    const tile: DataTile = dataContent.tiles[i];
    toTiles(tile).forEach(element => {
      tiles.push(element);
      frequencies.push(tile.frequency);
    });
  }

  return {cellSize: cellSize, tiles: tiles, frequencies: frequencies};
}

function toTiles(dataTile: DataTile): Tile[] {
  const uid = makeTileUid();
  return dataTile.rotiationDegrees.map(degree => ({
    svg: dataTile.svg,
    ...rotateDirections(degree, dataTile),
    rotiationDegree: degree,
    uid: uid,
  }));
}

function rotateDirections(degree:number, dataTile: DataTile): {north: string; east: string; south: string; west: string;} {
  switch(degree) {
    case 0: return {
      north: dataTile.north,
      east: dataTile.east,
      south: dataTile.south,
      west: dataTile.west,
    }
    case 90: return {
      north: dataTile.west.split("").reverse().join(""),
      east: dataTile.north,
      south: dataTile.east.split("").reverse().join(""),
      west: dataTile.south,
    }
    case 180: return {
      north: dataTile.south.split("").reverse().join(""),
      east: dataTile.west.split("").reverse().join(""),
      south: dataTile.north.split("").reverse().join(""),
      west: dataTile.east.split("").reverse().join(""),
    }
    case 270: return {
      north: dataTile.east,
      east: dataTile.south.split("").reverse().join(""),
      south: dataTile.west,
      west: dataTile.north.split("").reverse().join(""),
    }
    default:  return {
      north: dataTile.north,
      east: dataTile.east,
      south: dataTile.south,
      west: dataTile.west,
    }
  }
}

export function makeTileUid(): string {
    var length = 10;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
