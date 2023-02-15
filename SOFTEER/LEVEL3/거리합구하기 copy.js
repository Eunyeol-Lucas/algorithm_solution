const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

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

  setValueLength(value) {
    if (typeof value === "String" || "Number") this.length = 1;
    else this.length = value.length;
  }

  compare(a, b) {
    if (!(this.heap[a] && this.heap[b])) return false;
    if (this.type === "Object") {
      for (let i = 0; i < this.length; i++) {
        if (this.heap[a] > this.heap[b]) return true;
        else if (this.heap[a] < this.heap[b]) return false;
      }
    }
    return false;
  }

  push(value) {
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
      if (this.compare(curIdx, leftIdx)) this.swap(curIdx, leftIdx);
      return min;
    }

    while (this.compare(curIdx, leftIdx) || this.compare(curIdx, rightIdx)) {
      const minIdx = this.compare(leftIdx > rightIdx) ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }
    return min;
  }
}

function solution(n, arr) {
  const answer = [];
  const graph = Array.from({ length: n + 1 }, () => new Array());
  const distance = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(Infinity)
  );
  for (let i = 0; i < arr.length; i++) {
    const [a, b, c] = arr[i];
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const dijkstra = (idx, start) => {
    const heap = new MinHeap();
    distance[idx][start] = 0;
    heap.push([0, start]);
    while (heap.size()) {
      const [dist, now] = heap.pop();
      if (distance[now] < dist) continue;
      for (const x of graph[now]) {
        const cost = dist + x[1];
        if (cost < distance[idx][x[0]]) {
          distance[idx][x[0]] = cost;
          heap.push([cost, x[0]]);
        }
      }
    }
  };

  for (let i = 1; i <= n; i++) {
    dijkstra(i, i);
  }

  for (let i = 1; i <= n; i++) {
    const sum = distance[i].reduce((acc, cur) => {
      if (cur !== Infinity) return acc + cur;
      return acc;
    }, 0);
    answer.push(sum);
  }
  return answer.join("\n");
}

const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" ").map(Number));
console.log(solution(N, arr));
