/**
 * 유형: 다익스트라, BFS(모두 틀림~)
 */
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

function solution2(m, n, arr) {
  const vst = Array.from({ length: n }, () => Array(m).fill(0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const heap = new MinHeap();
  vst[0][0] = 1;
  heap.heappush([0, 0, 0]);
  while (heap.size()) {
    const [cnt, x, y] = heap.heappop();
    if (x === n - 1 && y === m - 1) return cnt;
    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (!vst[nx][ny]) {
        vst[nx][ny] = 1;
        heap.heappush([cnt + arr[nx][ny], nx, ny]);
      }
    }
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [M, N] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((i) => i.split("").map(Number));
console.log(solution2(M, N, arr));

function solution(m, n, arr) {
  const distance = Array.from({ length: n }, () => Array(m).fill(Infinity));

  function dijkstra(i, j) {
    const heap = new MinHeap();
    heap.heappush([0, i, j]);
    distance[i][j] = 0;
    while (heap.size()) {
      const [dist, x, y] = heap.heappop();
      if (distance[x][y] < dist) continue;
      for (const [dx, dy] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const [nx, ny] = [x + dx, y + dy];
        if (0 <= nx && nx < n && 0 <= ny && ny < m) {
          const cost = dist + arr[nx][ny];
          if (cost < distance[nx][ny]) {
            distance[nx][ny] = cost;
            heap.heappush([cost, nx, ny]);
          }
        }
      }
    }
  }
  dijkstra(0, 0);
  return distance[n - 1][m - 1];
}
