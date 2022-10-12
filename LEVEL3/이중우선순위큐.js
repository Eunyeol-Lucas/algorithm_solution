class MinHeap {
  constructor() {
    this.minHeap = [];
  }

  swap(a, b) {
    [this.minHeap[a], this.minHeap[b]] = [this.minHeap[b], this.minHeap[a]];
  }

  size() {
    return this.minHeap.length;
  }

  push(value) {
    this.minHeap.push(value);
    let idx = this.minHeap.length - 1;
    let parent = Math.floor((idx - 1) / 2);

    while (this.minHeap[parent] > value) {
      this.swap(parent, idx);
      idx = parent;
      parent = Math.floor((idx - 1) / 2);
    }
  }

  pop() {
    if (this.minHeap.length < 1) return null;

    const res = this.minHeap.shift();
    if (this.minHeap.length === 0) return res;

    this.minHeap.unshift(this.minHeap.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.minHeap.length) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.minHeap[left] < this.minHeap[next]) next = left;

      if (
        right < this.minHeap.length &&
        this.minHeap[right] < this.minHeap[next]
      )
        next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
}

class MaxHeap {
  constructor() {
    this.minHeap = new MinHeap();
  }
  push(value) {
    this.minHeap.push(value * -1);
  }
  pop() {
    let min = this.minHeap.pop();
    if (min === null) return null;
    return min * -1;
  }
}

class MinMaxHeap {
  constructor() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MaxHeap();
    this.obj = {};
  }
  push(value) {
    this.minHeap.push(value);
    this.maxHeap.push(value);
    if (this.obj[value] === undefined) this.obj[value] = 1;
    else this.obj[value]++;
  }
  popMax() {
    let max = this.maxHeap.pop();

    while (max !== null && this.obj[max] === 0) {
      max = this.maxHeap.pop();
    }
    if (max === null) return null;
    else {
      this.obj[max]--;
      return max;
    }
  }
  popMin() {
    let min = this.minHeap.pop();

    while (min !== null && this.obj[min] === 0) {
      min = this.minHeap.pop();
    }
    if (min === null) return null;
    else {
      this.obj[min]--;
      return min;
    }
  }
}

function solution(operations) {
  let minMaxHeap = new MinMaxHeap();

  for (let operation of operations) {
    if (operation === "D -1") minMaxHeap.popMin();
    else if (operation === "D 1") {
      minMaxHeap.popMax();
    } else {
      minMaxHeap.push(parseInt(operation.split(" ")[1]));
    }
  }

  const result = [minMaxHeap.popMax(), minMaxHeap.popMin()];
  if (result[0] === null) return [0, 0];
  if (result[1] === null) return [result[0], result[0]];
  return result;
}

// const operations = ["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"];
const operations = [
  "I -45",
  "I 653",
  "D 1",
  "I -642",
  "I 45",
  "I 97",
  "D 1",
  "D -1",
  "I 333",
];
console.log(solution(operations));
