import { Direction } from "../types";
import NeighborsHelper from "./neighbours";

describe("it should work", () => {
  const MAX_ROW = 5;
  const MAX_COL = 5;

  it("position [0, 0] should not have SOUTH & EAST", () => {
    const sut = new NeighborsHelper(MAX_ROW, MAX_COL);
    const neighbors = sut.getNeighbors(0, 0);

    expect(neighbors.length).toBe(2);
    expect(neighbors[0].direction).toBe(Direction.SOUTH);
    expect(neighbors[0].row).toBe(1);
    expect(neighbors[0].col).toBe(0);

    expect(neighbors[1].direction).toBe(Direction.EAST);
    expect(neighbors[1].row).toBe(0);
    expect(neighbors[1].col).toBe(1);
  });

  it("position [MAX_ROW, MAX_COL] should not have NORTH & WEST", () => {
    const sut = new NeighborsHelper(MAX_ROW, MAX_COL);
    const neighbors = sut.getNeighbors(MAX_ROW, MAX_COL);

    expect(neighbors.length).toBe(2);
    expect(neighbors[0].direction).toBe(Direction.NORTH);
    expect(neighbors[0].row).toBe(4);
    expect(neighbors[0].col).toBe(MAX_COL);

    expect(neighbors[1].direction).toBe(Direction.WEST);
    expect(neighbors[1].row).toBe(MAX_ROW);
    expect(neighbors[1].col).toBe(4);
  });

  it("position [MAX_ROW, 0] should not have NORTH & EAST", () => {
    const sut = new NeighborsHelper(MAX_ROW, MAX_COL);
    const neighbors = sut.getNeighbors(MAX_ROW, 0);

    expect(neighbors.length).toBe(2);
    expect(neighbors[0].direction).toBe(Direction.NORTH);
    expect(neighbors[0].row).toBe(4);
    expect(neighbors[0].col).toBe(0);

    expect(neighbors[1].direction).toBe(Direction.EAST);
    expect(neighbors[1].row).toBe(MAX_ROW);
    expect(neighbors[1].col).toBe(1);
  });

  it("position [0, MAX_COL] should not have SOUTH & WEST", () => {
    const sut = new NeighborsHelper(MAX_ROW, MAX_COL);
    const neighbors = sut.getNeighbors(0, MAX_COL);

    expect(neighbors.length).toBe(2);
    expect(neighbors[0].direction).toBe(Direction.SOUTH);
    expect(neighbors[0].row).toBe(1);
    expect(neighbors[0].col).toBe(MAX_COL);

    expect(neighbors[1].direction).toBe(Direction.WEST);
    expect(neighbors[1].row).toBe(0);
    expect(neighbors[1].col).toBe(4);
  });
})
