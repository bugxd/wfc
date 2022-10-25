import { Adjacents, Tiles } from "../types";
import Wfc from "./wfc";

describe("wfc tests", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.234567891);
  });

  afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
  });

  it("should updateHeap", () => {
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

    const sut = new Wfc({
      gridRows: 3,
      gridCols: 3,
      tiles: tiles,
      frequencies: frequencies,
      adjacents: adjacents,
    });

    sut.updateHeap();

    expect(sut.heap).toMatchSnapshot();
  });

  it("should map grid", () => {
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

    const sut = new Wfc({
      gridRows: 3,
      gridCols: 3,
      tiles: tiles,
      frequencies: frequencies,
      adjacents: adjacents,
    });

    const result = sut.mapGrid();

    expect(result).toMatchSnapshot();
  });
})
