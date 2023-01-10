// pop에서 shift와 unshift를 사용하기 때문에 시간 복잡도 증가
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

    this.heap.unshift(this.heap.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.heap[left] < this.heap[next]) next = left;

      if (right < this.heap.length && this.heap[right] < this.heap[next])
        next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
}

class Heap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  heappop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] < this.heap[curIdx]) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    }

    while (
      this.heap[leftIdx] < this.heap[curIdx] ||
      this.heap[rightIdx] < this.heap[curIdx]
    ) {
      const minIdx =
        this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }
}

const loop = 10;
function minHeapTest() {
  const heap = new MinHeap();
  for (let i = 0; i <= loop; i++) {
    const tmp = Math.random() * 100;
    heap.push(tmp);
  }
  for (let i = 0; i <= loop; i++) {
    heap.pop();
  }
}

function heapTest() {
  const heap = new Heap();
  for (let i = 0; i <= loop; i++) {
    const tmp = Math.random() * 100;
    heap.heappush(tmp);
  }
  for (let i = 0; i <= loop; i++) {
    heap.heappop();
  }
}

// console.time("minHeap");
// minHeapTest();
// console.timeEnd("minHeap");

console.time("heap");
heapTest();
console.timeEnd("heap");
