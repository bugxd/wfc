import { Direction } from "../types";
import { adjacents, frequencies } from "./adjacents";
import { tiles } from "./tiles";

interface TileEnablerCount  {
  tileId: number;
  north: number;
  east: number;
  south: number;
  west: number;
}

class Cell {
  id: number;
  x: number; //top left
  y: number; //top left

  collapsed: boolean; // if true tile is set

  tileId?: number;
  tileSvg?: string;

  // remaining possible tiles for this cell
  possible: number[];

  sumPossibleTileWeights: number;
  sumPossibleTileWeighsLogWeights: number;

  entropyNois: number;

  tileEnablerCounts: TileEnablerCount[];

  constructor(id: number, x: number, y: number, possible: number[]) {
    this.id=id;
    this.x = x;
    this.y = y;
    this.collapsed = false;
    this.possible = possible;

    this.sumPossibleTileWeights = 0;
    this.sumPossibleTileWeighsLogWeights = 0;

    this.entropyNois = (Math.random() * (0.0 - 0.00001) + 0.00001);

    possible.forEach(i => {
      const freq = frequencies[i]
      this.sumPossibleTileWeights += freq;
      this.sumPossibleTileWeighsLogWeights += freq*Math.log(freq);
    });

    this.tileEnablerCounts = [];
    tiles.forEach((_, i) => {
      var adjacent = adjacents[i];
      this.tileEnablerCounts.push({
        tileId: i,
        north: adjacent.north.length,
        east: adjacent.east.length,
        south: adjacent.south.length,
        west: adjacent.west.length,
      });
    });
  }

  tileEnablersByDirection(tileId: number, direction: Direction): number {
    switch(direction) {
      case Direction.NORTH: return this.tileEnablerCounts[tileId].north;
      case Direction.EAST : return this.tileEnablerCounts[tileId].east;
      case Direction.SOUTH: return this.tileEnablerCounts[tileId].south;
      case Direction.WEST: return this.tileEnablerCounts[tileId].west;
    }
  }

  decreaseTileEnablersByDirection(tileId: number, direction: Direction): void {
    switch(direction) {
      case Direction.NORTH: console.log("[Cell(" + this.id + ")] decrease north tile " + tileId + " from " + this.tileEnablerCounts[tileId].north + "-1"); break;
      case Direction.EAST : console.log("[Cell(" + this.id + ")] decrease east tile " + tileId + " from " + this.tileEnablerCounts[tileId].east + "-1"); break;
      case Direction.SOUTH: console.log("[Cell(" + this.id + ")] decrease south tile " + tileId + " from " + this.tileEnablerCounts[tileId].south + "-1"); break;
      case Direction.WEST: console.log("[Cell(" + this.id + ")] decrease west tile " + tileId + " from " + this.tileEnablerCounts[tileId].west + "-1"); break;
    }

    switch(direction) {
      case Direction.NORTH: this.tileEnablerCounts[tileId].north -= 1; break;
      case Direction.EAST : this.tileEnablerCounts[tileId].east -= 1; break;
      case Direction.SOUTH: this.tileEnablerCounts[tileId].south -= 1; break;
      case Direction.WEST: this.tileEnablerCounts[tileId].west -= 1; break;
    }
  }

  removePossible(tileId: number): void {
    console.log("[Cell(" + this.id + ")].remove tile " + tileId);

    const i = this.possible.indexOf(tileId);
    if(i > -1) {
      this.possible = [...this.possible.slice(0, i),...this.possible.slice(i+1)];
    }

    const freq = frequencies[tileId]
    this.sumPossibleTileWeights -= freq;
    this.sumPossibleTileWeighsLogWeights -= freq*Math.log(freq);
  }

  entropy(): number {
    return (Math.log(this.sumPossibleTileWeights)
      - (this.sumPossibleTileWeighsLogWeights / this.sumPossibleTileWeights))
    + this.entropyNois;
  }

  collapse(): number[] {
    var remaining  = Math.floor(Math.random() * this.sumPossibleTileWeights);

    var tile = 0;
    this.possible.every(tileId => {
      const weight = frequencies[tileId];
      if (remaining >= weight) {
          remaining -= weight;
      } else {
          tile = tileId;
          return false;
      }
      return true;
    });

    console.log("[Cell(" + this.id + ")].collapse tile: " + tile + " remaining " + JSON.stringify([...this.possible]));

    this.tileId = tile;
    this.tileSvg = tiles[tile].svg;

    var removedPossibleTiles: number[] = [];
    const i = this.possible.indexOf(tile);
    if(i > -1) {
      removedPossibleTiles = [...this.possible.slice(0, i),...this.possible.slice(i+1,this.possible.length)];
    }

    this.possible = [];
    this.collapsed = true;

    return removedPossibleTiles;
  }
};

export default Cell;