class Heap<T> {
  heap: T[];

  constructor() {
    this.heap = [];
  }

  pop() {
    return this.heap.shift();
  }

  push(item: T) {
    this.heap.unshift(item);
  }

  clear() {
    this.heap = [];
  }

  order(compareFn?: (a: T, b: T) => number) {
    this.heap.sort(compareFn);
  }

}

export default Heap;
