import { Direction, TileEnablerCount } from "../types";

class Cell {
  readonly row: number;
  readonly col: number;

  collapsed: boolean;
  selectedTileId: number = -1;

  possibleTiles: number[];

  sumPossibleTileWeights = 0;
  sumPossibleTileWeighsLogWeights = 0;

  tileEnablerCounts: TileEnablerCount[];

  readonly entropyNois: number;

  constructor(props: {row: number, col: number, possibleTiles: number[], sumPossibleTileWeights: number, sumPossibleTileWeighsLogWeights: number, tileEnablerCounts: TileEnablerCount[]}) {
    this.row = props.row;
    this.col = props.col;
    this.collapsed = false;
    this.possibleTiles = props.possibleTiles;
    this.sumPossibleTileWeights = props.sumPossibleTileWeights;
    this.sumPossibleTileWeighsLogWeights = props.sumPossibleTileWeighsLogWeights;
    this.tileEnablerCounts = props.tileEnablerCounts;

    this.entropyNois = (Math.random() * (0.0 - 0.00001) + 0.00001);
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
      case Direction.NORTH: this.tileEnablerCounts[tileId].north -= 1; break;
      case Direction.EAST : this.tileEnablerCounts[tileId].east -= 1; break;
      case Direction.SOUTH: this.tileEnablerCounts[tileId].south -= 1; break;
      case Direction.WEST: this.tileEnablerCounts[tileId].west -= 1; break;
    }
  }

  removePossibleTiles(tileId: number, frequency: number): void {
    const i = this.possibleTiles.indexOf(tileId);
    if(i > -1) {
      this.possibleTiles = [...this.possibleTiles.slice(0, i), ...this.possibleTiles.slice(i+1)];
      this.sumPossibleTileWeights -= frequency;
      this.sumPossibleTileWeighsLogWeights -= frequency*Math.log(frequency);
    } else {
      throw new Error(`can not remove tile with id ${tileId} not found`)
    }
  }

  entropy(): number {
    return (Math.log(this.sumPossibleTileWeights)
      - (this.sumPossibleTileWeighsLogWeights / this.sumPossibleTileWeights))
    + this.entropyNois;
  }

  chooseTileId(frequencies: number[]): number {
    var remaining  = Math.floor(Math.random() * this.sumPossibleTileWeights);

    for(var i = 0; i< this.possibleTiles.length; i++) {
      const tileId = this.possibleTiles[i];
      const weight = frequencies[tileId];

      if (remaining >= weight) {
          remaining -= weight;
      } else {
          return tileId;
      }
    }

    throw new Error("sum of possible weights was inconsistent with possibletiles and relative_frequency")
  }

  collapse(frequencies: number[]): number[] {
    this.selectedTileId = this.chooseTileId(frequencies);

    var removedPossibleTiles: number[] = [];
    const i = this.possibleTiles.indexOf(this.selectedTileId);
    if(i > -1) {
      removedPossibleTiles = [...this.possibleTiles.slice(0, i), ...this.possibleTiles.slice(i+1, this.possibleTiles.length)];
    }

    this.possibleTiles = [];
    this.collapsed = true;

    return removedPossibleTiles;
  }
}

export default Cell;
