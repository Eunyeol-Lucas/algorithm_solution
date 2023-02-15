class MinHeap {
  constructor() {
    this.heap = [null];
    this.length = 0;
    this.type = "";
  }

  size() {
    return this.heap.length - 1;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  compare(a, b) {
    if (!(this.heap[a] && this.heap[b])) return false;
    if (this.type === "Number" || "String") return this.heap[a] > this.heap[b];
    else {
      for (let i = 0; i < this.length; i++) {
        if (this.heap[a][i] > this.heap[b][i]) return true;
        else if (this.heap[a][i] < this.heap[b][i]) return false;
      }
    }
  }

  setType(value) {
    this.type = typeof value;
  }

  setElementLength(value) {
    if (typeof value === Object) this.length = value.length;
    else this.length = 1;
  }

  push(value) {
    if (!this.length) {
      this.setType(value);
      this.setElementLength(value);
    }
    this.heap.push(value);
    let curIdx = this.size();
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.compare(parIdx, curIdx)) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  pop() {
    const min = this.heap[1];
    if (this.size() <= 1) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.compare(curIdx, leftIdx)) this.swap(leftIdx, curIdx);
      return min;
    }

    while (this.compare(curIdx, leftIdx) || this.compare(curIdx, rightIdx)) {
      const minIdx = this.compare(leftIdx, rightIdx) ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }
    return min;
  }
}

// class MinHeap2 {
//   constructor() {
//     this.heap = [null];
//   }

//   size() {
//     return this.heap.length - 1;
//   }

//   swap(a, b) {
//     [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
//   }

//   compare(a, b) {
//     if (!(this.heap[a] && this.heap[b])) return false;
//     for (let i = 0; i < this.length; i++) {
//       if (this.heap[a][i] > this.heap[b][i]) return true;
//       else if (this.heap[a][i] < this.heap[b][i]) return false;
//     }
//   }

//   push(value) {
//     this.heap.push(value);
//     let curIdx = this.size();
//     let parIdx = (curIdx / 2) >> 0;

//     while (curIdx > 1 && this.compare(parIdx, curIdx)) {
//       this.swap(parIdx, curIdx);
//       curIdx = parIdx;
//       parIdx = (curIdx / 2) >> 0;
//     }
//   }

//   pop() {
//     const min = this.heap[1];
//     if (this.size() <= 1) this.heap = [null];
//     else this.heap[1] = this.heap.pop();

//     let curIdx = 1;
//     let leftIdx = curIdx * 2;
//     let rightIdx = curIdx * 2 + 1;

//     if (!this.heap[leftIdx]) return min;
//     if (!this.heap[rightIdx]) {
//       if (this.compare(curIdx, leftIdx)) this.swap(leftIdx, curIdx);
//       return min;
//     }

//     while (
//       (curIdx > 1 && this.compare(curIdx, leftIdx)) ||
//       this.compare(curIdx, rightIdx)
//     ) {
//       const minIdx = this.compare(leftIdx, rightIdx) ? rightIdx : leftIdx;
//       this.swap(minIdx, curIdx);
//       curIdx = minIdx;
//       leftIdx = curIdx * 2;
//       rightIdx = curIdx * 2 + 1;
//     }
//     return min;
//   }
// }

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

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  pop() {
    const min = this.heap[1];
    if (this.size() <= 1) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] < this.heap[curIdx]) this.swap(leftIdx, curIdx);

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

const d = 100000;
const arr = Array.from({ length: d }, () => Math.random() * d);
function minHeapTest(Heap) {
  const heap = new Heap();
  for (const x of arr) {
    heap.push(x);
  }
  for (let i = 0; i < d; i++) heap.pop();
}

console.time("MinHeap comparing the type");
minHeapTest(MinHeap);
console.timeEnd("MinHeap comparing the type");

console.time("Heap not comparing type");
minHeapTest(Heap);
console.timeEnd("Heap not comparing type");
