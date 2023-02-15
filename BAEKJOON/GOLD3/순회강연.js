const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
class MinHeap {
  constructor() {
    this.minHeap = [];
  }

  swap(a, b) {
    [this.minHeap[a], this.minHeap[b]] = [this.minHeap[b], this.minHeap[a]];
  }
  size() {
    return this.minHeap.length - 1;
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

function solution(N, arr) {
  if (N === 0) return 0;
  const minHeap = new MinHeap();
  arr.sort((a, b) => a[1] - b[1]);
  for (const [x, y] of arr) {
    minHeap.push(x);
    if (minHeap.size() >= y) {
      z = minHeap.pop();
    }
  }
  return minHeap.minHeap.reduce((acc, cur) => acc + cur, 0);
}

const arr = input.map((i) => i.split(" ").map(Number));
console.log(solution(N, arr));
