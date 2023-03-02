/**
 * 유형: 플로이드워셜, 다익스트라
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [input, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, m, x, arr) {
  let answer = 0;
  const graph = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(Infinity)
  );

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  for (let i = 0; i < m; i++) {
    const [a, b, c] = arr[i].split(" ").map(Number);
    graph[a][b] = c;
  }

  for (let k = 1; k <= n; k++) {
    for (let a = 1; a <= n; a++) {
      for (let b = 1; b <= n; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    answer = Math.max(answer, graph[i][x] + graph[x][i]);
  }

  return answer;
}
const [N, M, X] = input.split(" ").map(Number);

console.log(solution(N, M, X, arr));

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
    const len = this.heap[a].length;
    for (let i = 0; i < len; i++) {
      if (this.heap[a][i] > this.heap[b][i]) return true;
      else if (this.heap[a][i] < this.heap[b][i]) return false;
    }
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

function solution2(n, m, x, arr) {
  let answer = 0;
  const graph = Array.from({ length: n + 1 }, () => new Array());
  const graph2 = Array.from({ length: n + 1 }, () => new Array());

  for (let i = 0; i < m; i++) {
    const [a, b, c] = arr[i].split(" ").map(Number);
    graph[a].push([b, c]);
    graph2[b].push([a, c]);
  }

  const dijkstra = (start, arr) => {
    const heapq = new MinHeap();
    const distance = Array.from({ length: n + 1 }, () => Infinity);

    distance[start] = 0;
    heapq.push([0, start]);

    while (heapq.size()) {
      const [dist, now] = heapq.pop();

      if (dist > distance[now]) continue;
      for (const [target, expense] of arr[now]) {
        const cost = dist + expense;
        if (cost < distance[target]) {
          distance[target] = cost;
          heapq.push([cost, target]);
        }
      }
    }
    return [...distance];
  };

  const a = dijkstra(x, graph);
  const b = dijkstra(x, graph2);

  for (let i = 1; i <= n; i++) {
    answer = Math.max(answer, a[i] + b[i]);
  }

  return answer;
}

console.log(solution2(N, M, X, arr));
