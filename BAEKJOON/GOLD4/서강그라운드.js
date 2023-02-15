/**
 * 유형: 다익스트라
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

class MinHeap {
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
    let curIdx = this.size();
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

function solution(input) {
  const [n, m, r] = input[0].split(" ").map(Number);
  const itemCnts = input[1].split(" ").map(Number);
  const arr = input.slice(2);

  const graph = Array.from({ length: n + 1 }, () => new Array());
  const distance = Array.from({ length: n }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );

  for (let i = 0; i < r; i++) {
    const [a, b, c] = arr[i].split(" ").map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const dijkstra = (idx, start) => {
    const heapq = new MinHeap();
    heapq.heappush([0, start]);
    distance[idx][start] = 0;
    while (heapq.size()) {
      let [dist, now] = heapq.heappop();
      if (distance[idx][now] < dist) continue;

      for (const x of graph[now]) {
        const cost = dist + x[1];
        if (cost < distance[idx][x[0]]) {
          distance[idx][x[0]] = cost;
          heapq.heappush([cost, x[0]]);
        }
      }
    }
  };
  for (let i = 1; i <= n; i++) {
    dijkstra(i - 1, i);
  }
  let answer = 0;
  for (let i = 0; i < n; i++) {
    let tmp = 0;
    for (let j = 1; j <= n; j++) {
      if (distance[i][j] <= m) {
        tmp += itemCnts[j - 1];
      }
    }
    answer = Math.max(answer, tmp);
  }
  return answer;
}

console.log(solution(input));
