class MaxHeap {
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

    while (this.heap[parent] < value) {
      this.swap(parent, idx);
      idx = parent;
      parent = Math.floor((idx - 1) / 2);
    }
  }

  pop() {
    const lastIdx = this.heap.length - 1;
    let idx = 0;
    this.swap(0, lastIdx);
    let value = this.heap.pop();

    while (idx < lastIdx) {
      let leftChildIdx = idx * 2 + 1;
      let rightChildIdx = idx * 2 + 2;

      if (leftChildIdx >= lastIdx) {
        break;
      } else if (rightChildIdx >= lastIdx) {
        if (this.heap[idx] < this.heap[leftChildIdx]) {
          this.swap(idx, leftChildIdx);
          idx = leftChildIdx;
        } else {
          break;
        }
      } else {
        if (
          this.heap[leftChildIdx] > this.heap[idx] &&
          this.heap[rightChildIdx] > this.heap[idx]
        ) {
          if (this.heap[leftChildIdx] > this.heap[rightChildIdx]) {
            this.swap(idx, leftChildIdx);
            idx = leftChildIdx;
          } else {
            this.swap(idx, rightChildIdx);
            idx = rightChildIdx;
          }
        } else if (this.heap[leftChildIdx] > this.heap[idx]) {
          this.swap(leftChildIdx, idx);
          idx = leftChildIdx;
        } else if (this.heap[rightChildIdx] > this.heap[idx]) {
          this.swap(rightChildIdx, idx);
          idx = rightChildIdx;
        } else {
          break;
        }
      }
    }
    return value;
  }
}

const heap = new MaxHeap();

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
