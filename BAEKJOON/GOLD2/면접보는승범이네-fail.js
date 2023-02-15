/**
 * 유형: 다익스트라
 * 시간 초과 하...
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, M + 1);
const spots = input[input.length - 1].split(" ").map(Number);

class MinHeap {
  constructor() {
    this.heap = [null];
  }
  size() {
    return this.heap.length - 1;
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

const graph = Array.from({ length: N + 1 }, () => new Array());

for (let i = 1; i <= M; i++) {
  const [a, b, c] = arr[i - 1].split(" ").map(Number);
  graph[b].push([a, c]);
}
const dijkstra = () => {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  const heap = new MinHeap();
  for (const i of spots) {
    heap.heappush([0, i]);
    distance[i] = 0;
  }
  while (heap.size()) {
    const [dist, now] = heap.heappop();
    if (distance[now] < dist) continue;

    for (const [finalN, finalD] of graph[now]) {
      const cost = dist + finalD;
      if (cost < distance[finalN]) {
        distance[finalN] = cost;
        heap.heappush([cost, finalN]);
      }
    }
  }
  return distance;
};
const distance = dijkstra();

let [index, dist] = [0, 0];
for (let i = 1; i <= N; i++) {
  if (dist < distance[i]) {
    [index, dist] = [i, distance[i]];
  }
}
console.log([index, dist].join("\n"));
