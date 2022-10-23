import { Direction } from "../types";
import Cell from "./cell";

describe("cell test", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2);
  });

  afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
  })

  it("should fill all class properties", () => {
    const sut = new Cell({
      row: 0,
      col: 0,
      possibleTiles: [0, 1, 2],
      sumPossibleTileWeights: 0,
      sumPossibleTileWeighsLogWeights: 0,
      tileEnablerCounts: [],
    });

    expect(sut.row).toBe(0);
    expect(sut.col).toBe(0);
    expect(sut.possibleTiles).toStrictEqual([0, 1, 2]);
    expect(sut.sumPossibleTileWeights).toBe(0);
    expect(sut.sumPossibleTileWeighsLogWeights).toBe(0);
    expect(sut.tileEnablerCounts).toStrictEqual([]);
  });

  describe("tile enabler count", () => {
    it("should decreas north tile enabler count", () => {
      const sut = new Cell({
        row: 0,
        col: 0,
        possibleTiles: [0, 1, 2],
        sumPossibleTileWeights: 0,
        sumPossibleTileWeighsLogWeights: 0,
        tileEnablerCounts: [{
          tileId: 0,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        },{
          tileId: 1,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        }],
      });

      sut.decreaseTileEnablersByDirection(0, Direction.NORTH);

      var resultOne = sut.tileEnablersByDirection(0, Direction.NORTH);
      var resultTwo = sut.tileEnablersByDirection(1, Direction.NORTH);

      expect(resultOne).toBe(4);
      expect(resultTwo).toBe(5);
    });

    it("should decreas east tile enabler count", () => {
      const sut = new Cell({
        row: 0,
        col: 0,
        possibleTiles: [0, 1, 2],
        sumPossibleTileWeights: 0,
        sumPossibleTileWeighsLogWeights: 0,
        tileEnablerCounts: [{
          tileId: 1,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        },{
          tileId: 2,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        }],
      });

      sut.decreaseTileEnablersByDirection(0, Direction.EAST);

      var resultOne = sut.tileEnablersByDirection(0, Direction.EAST);
      var resultTwo = sut.tileEnablersByDirection(1, Direction.EAST);

      expect(resultOne).toBe(4);
      expect(resultTwo).toBe(5);
    });

    it("should decreas south tile enabler count", () => {
      const sut = new Cell({
        row: 0,
        col: 0,
        possibleTiles: [0, 1, 2],
        sumPossibleTileWeights: 0,
        sumPossibleTileWeighsLogWeights: 0,
        tileEnablerCounts: [{
          tileId: 1,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        },{
          tileId: 2,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        }],
      });

      sut.decreaseTileEnablersByDirection(0, Direction.SOUTH);

      var resultOne = sut.tileEnablersByDirection(0, Direction.SOUTH);
      var resultTwo = sut.tileEnablersByDirection(1, Direction.SOUTH);

      expect(resultOne).toBe(4);
      expect(resultTwo).toBe(5);
    });

    it("should decreas west tile enabler count", () => {
      const sut = new Cell({
        row: 0,
        col: 0,
        possibleTiles: [0, 1, 2],
        sumPossibleTileWeights: 0,
        sumPossibleTileWeighsLogWeights: 0,
        tileEnablerCounts: [{
          tileId: 1,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        },{
          tileId: 2,
          north: 5,
          east: 5,
          south: 5,
          west: 5,
        }],
      });

      sut.decreaseTileEnablersByDirection(0, Direction.WEST);

      var resultOne = sut.tileEnablersByDirection(0, Direction.WEST);
      var resultTwo = sut.tileEnablersByDirection(1, Direction.WEST);

      expect(resultOne).toBe(4);
      expect(resultTwo).toBe(5);
    });
  });

  describe("remove possible tiles", () => {
    it("should remove found tile", () => {
      // const frequencies = [1, 1, 1, 1, 1];
      const sut = new Cell({
        row: 0,
        col: 0,
        possibleTiles: [0, 1, 2, 3, 4],
        sumPossibleTileWeights: 5,
        sumPossibleTileWeighsLogWeights: 0,
        tileEnablerCounts: [],
      });

      sut.removePossibleTiles(1, 1);

      expect(sut.possibleTiles).toStrictEqual([0, 2, 3, 4]);
      expect(sut.sumPossibleTileWeights).toEqual(4);
      expect(sut.sumPossibleTileWeighsLogWeights).toEqual(0);
    });

    it("should throw errow for not found tile", () => {
      // const frequencies = [1, 1, 1, 1, 1];
      const sut = new Cell({
        row: 0,
        col: 0,
        possibleTiles: [0, 1, 2, 3, 4],
        sumPossibleTileWeights: 5,
        sumPossibleTileWeighsLogWeights: 0,
        tileEnablerCounts: [],
      });

      expect(() => sut.removePossibleTiles(10, 1)).toThrow(Error);
    })
  });

  it("should calculate the entropy", () => {
    const sut = new Cell({
      row: 0,
      col: 0,
      possibleTiles: [0, 1, 2],
      sumPossibleTileWeights: 3,
      sumPossibleTileWeighsLogWeights: 0,
      tileEnablerCounts: [],
    });

    const noise = sut.entropyNois;

    const result = sut.entropy();

    expect(result).toBe(1.0986122886681096 + noise);
  });

  it("should choose a TileId", () => {
    const frequencies = [1, 1, 1, 1];
    const sut = new Cell({
      row: 0,
      col: 0,
      possibleTiles: [1, 2, 3, 4],
      sumPossibleTileWeights: 4,
      sumPossibleTileWeighsLogWeights: 0,
      tileEnablerCounts: [],
    });

    var result = sut.chooseTileId(frequencies);

    expect(result).toBe(1);
  })

  it("should collapse the cell", () => {
    const frequencies = [1, 1, 1, 1];
    const sut = new Cell({
      row: 0,
      col: 0,
      possibleTiles: [1, 2, 3, 4],
      sumPossibleTileWeights: 4,
      sumPossibleTileWeighsLogWeights: 0,
      tileEnablerCounts: [],
    });

    const result = sut.collapse(frequencies);

    expect(result).toStrictEqual([2, 3, 4]);
    expect(sut.collapsed).toBeTruthy();
    expect(sut.possibleTiles).toStrictEqual([]);
  });
});
