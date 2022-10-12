class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    let parent = Math.floor((idx - 1) / 2);

    while (this.heap[parent] > value) {
      this.swap(parent, idx);
      idx = parent;
      parent = Math.floor((idx - 1) / 2);
    }
  }

  pop() {
    const res = this.heap.shift();
    if (this.heap.length === 0) return res;

    this.heap.unshift(heap.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.heap[left] < this.heap[next]) next = left;

      if (right < this.heap.length && heap[right] < heap[next]) next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
}

const heap = new MinHeap();

heap.push(10);
heap.push(8);
heap.pop();
heap.push(1);
heap.push(6);
heap.push(3);
heap.push(50);
heap.pop();
heap.push(1);
heap.push(7);
heap.push(10);
heap.pop();
heap.push(1);

console.log(heap.heap);
