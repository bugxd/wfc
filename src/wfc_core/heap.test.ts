import Heap from "./heap";

describe("heap test", () => {
  it("should add and remove elements", () => {
    const sut = new Heap<number>();

    sut.push(1);

    var result = sut.pop();

    expect(result).toBe(1);
  });

  it("should add many and remove last elements", () => {
    const sut = new Heap<number>();

    sut.push(1);
    sut.push(2);
    sut.push(3);
    sut.push(4);

    var result = sut.pop();

    expect(result).toBe(4);
  });

  it("should order elements", () => {
    const sut = new Heap<number>();

    sut.push(1);
    sut.push(2);
    sut.push(3);
    sut.push(4);

    sut.order((a, b) => a-b);
    var result = sut.pop();

    expect(result).toBe(1);
  });

  it("should clear all elements", () => {
    const sut = new Heap<number>();

    sut.push(1);
    sut.push(2);
    sut.push(3);
    sut.push(4);

    sut.clear();
    var result = sut.pop();

    expect(result).toBeUndefined();
  });
});
