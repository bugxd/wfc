import { toDataFile, fromDataFile } from "./data_file_utils";

describe("data utils tests", () => {
  describe("toDataFile", () => {
    it("should combine same tiles", () => {
      const result = toDataFile({
        cellSize: 10,
        tiles: [{
          svg: "svg_a",
          north: "north_a",
          east: "east_a",
          south: "south_a",
          west: "west_a",
          rotiationDegree: 0,
          uid: "a",
        },{
          svg: "svg_a",
          north: "north_a",
          east: "east_a",
          south: "south_a",
          west: "west_a",
          rotiationDegree: 90,
          uid: "a",
        },{
          svg: "svg_a",
          north: "north_a",
          east: "east_a",
          south: "south_a",
          west: "west_a",
          rotiationDegree: 180,
          uid: "a",
        },{
          svg: "svg_a",
          north: "north_a",
          east: "east_a",
          south: "south_a",
          west: "west_a",
          rotiationDegree: 270,
          uid: "a",
        },{
          svg: "svg_b",
          north: "north_b",
          east: "east_b",
          south: "south_b",
          west: "west_b",
          rotiationDegree: 0,
          uid: "b",
        },{
          svg: "svg_b",
          north: "north_b",
          east: "east_b",
          south: "south_b",
          west: "west_b",
          rotiationDegree: 90,
          uid: "b",
        },{
          svg: "svg_c",
          north: "north_c",
          east: "east_c",
          south: "south_c",
          west: "west_c",
          rotiationDegree: 90,
          uid: "c",
        }],
        frequencies: [1,1,1,1,2,2,3]
      });

      expect(result).toMatchSnapshot();
    })
  });

  describe("fromDataFile", () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.234567891);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it("should throw error without cell size", () => {
      const content = JSON.stringify({
        tiles: [],
      })

      expect(() => fromDataFile(content)).toThrowError("[fromDataFile]: missing cell size");
    });

    it("should throw error without tiles", () => {
      const content = JSON.stringify({
        cellSize: 10,
      })

      expect(() => fromDataFile(content)).toThrowError("[fromDataFile]: missing tiles");
    });

    it("should get tiles from data", () => {
      const content = JSON.stringify({
        cellSize: 10,
        tiles: [{
          svg: "svg1",
          north: "north1",
          east: "east11",
          south: "south1",
          west: "west1",
          rotiationDegrees: [0, 90, 180, 270],
          frequency: 1,
        },{
          svg: "svg2",
          north: "north2",
          east: "east2",
          south: "south2",
          west: "west2",
          rotiationDegrees: [0, 90, 180, 270],
          frequency: 2,
        }],
      })

      const result = fromDataFile(content);

      expect(result.cellSize).toBe(10);
      expect(result.frequencies).toStrictEqual([1,1,1,1,2,2,2,2]);
      expect(result.tiles).toMatchSnapshot();
    });
  });
});
