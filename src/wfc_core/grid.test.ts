import Grid from "./grid";
import { Adjacents, Direction, Tiles } from "../types";


describe("grid tests", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.234567891);
  });

  afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
  });

  it("should fill grid", () => {
    const tiles: Tiles = [
      {
        svg: "+",
        north: "aba",
        east: "aba",
        south: "aba",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "|",
        north: "aba",
        east: "aaa",
        south: "aba",
        west: "aaa",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "-",
        north: "aaa",
        east: "aba",
        south: "aaa",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      }
    ];
    const frequencies: number[] = [1, 1, 1];
    const adjacents: Adjacents = [
      {
        tileId: 0,
        north: [0, 1],
        east: [0, 2],
        south: [0, 1],
        west: [0, 2],
      },
      {
        tileId: 1,
        north: [0, 1],
        east: [0],
        south: [0, 1],
        west: [0],
      },
      {
        tileId: 2,
        north: [0],
        east: [0, 2],
        south: [0],
        west: [0, 2],
      }
    ];
    const sut = new Grid({
      rows: 3,
      cols: 3,
      tiles: tiles,
      frequencies: frequencies,
      adjacents: adjacents
    });

    expect(sut.rows).toBe(3);
    expect(sut.cols).toBe(3);
    expect(sut.remainingUncollapsedCells).toBe(9);

    expect(sut.grid).toMatchSnapshot();
  });

  it("should remove possible tiles", () => {
    const tiles: Tiles = [
      {
        svg: "+",
        north: "aba",
        east: "aba",
        south: "aba",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "|",
        north: "aba",
        east: "aaa",
        south: "aba",
        west: "aaa",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "-",
        north: "aaa",
        east: "aba",
        south: "aaa",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      }
    ];
    const frequencies: number[] = [1, 1, 1];
    const adjacents: Adjacents = [
      {
        tileId: 0,
        north: [0, 1],
        east: [0, 2],
        south: [0, 1],
        west: [0, 2],
      },
      {
        tileId: 1,
        north: [0, 1],
        east: [0],
        south: [0, 1],
        west: [0],
      },
      {
        tileId: 2,
        north: [0],
        east: [0, 2],
        south: [0],
        west: [0, 2],
      }
    ];
    const sut = new Grid({
      rows: 3,
      cols: 3,
      tiles: tiles,
      frequencies: frequencies,
      adjacents: adjacents
    });

    sut.removePossibleTiles(1, 1, 1, 1);

    expect(sut.getCell(0, 0).possibleTiles).toStrictEqual([0, 1, 2]);
    expect(sut.getCell(1, 1).possibleTiles).toStrictEqual([0, 2]);
  });

  it("should decrease Tile Enablers By Direction", () => {
    const tiles: Tiles = [
      {
        svg: "+",
        north: "aba",
        east: "aba",
        south: "aba",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "|",
        north: "aba",
        east: "aaa",
        south: "aba",
        west: "aaa",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "-",
        north: "aaa",
        east: "aba",
        south: "aaa",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      }
    ];
    const frequencies: number[] = [1, 1, 1];
    const adjacents: Adjacents = [
      {
        tileId: 0,
        north: [0, 1],
        east: [0, 2],
        south: [0, 1],
        west: [0, 2],
      },
      {
        tileId: 1,
        north: [0, 1],
        east: [0],
        south: [0, 1],
        west: [0],
      },
      {
        tileId: 2,
        north: [0],
        east: [0, 2],
        south: [0],
        west: [0, 2],
      }
    ];
    const sut = new Grid({
      rows: 3,
      cols: 3,
      tiles: tiles,
      frequencies: frequencies,
      adjacents: adjacents
    });

    sut.decreaseTileEnablersByDirection(1, 1, 1, Direction.NORTH);

    expect(sut.getCell(0, 0).tileEnablerCounts[1].north).toBe(2);
    expect(sut.getCell(1, 1).tileEnablerCounts[1].north).toBe(1);
  });

  it("should collapse a cell", () => {
    const tiles: Tiles = [
      {
        svg: "+",
        north: "aba",
        east: "aba",
        south: "aba",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "|",
        north: "aba",
        east: "aaa",
        south: "aba",
        west: "aaa",
        rotiationDegree: 0,
        uid: "a",
      },
      {
        svg: "-",
        north: "aaa",
        east: "aba",
        south: "aaa",
        west: "aba",
        rotiationDegree: 0,
        uid: "a",
      }
    ];
    const frequencies: number[] = [1, 1, 1];
    const adjacents: Adjacents = [
      {
        tileId: 0,
        north: [0, 1],
        east: [0, 2],
        south: [0, 1],
        west: [0, 2],
      },
      {
        tileId: 1,
        north: [0, 1],
        east: [0],
        south: [0, 1],
        west: [0],
      },
      {
        tileId: 2,
        north: [0],
        east: [0, 2],
        south: [0],
        west: [0, 2],
      }
    ];
    const sut = new Grid({
      rows: 3,
      cols: 3,
      tiles: tiles,
      frequencies: frequencies,
      adjacents: adjacents
    });

    const result = sut.collapseCell(1, 1);

    expect(result).toStrictEqual([1, 2]);
    expect(sut.grid).toMatchSnapshot();
  });
})
