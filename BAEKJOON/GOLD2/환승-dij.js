/**
 * 유형: 다익스트라
 * 메모리: 193100	시간: 3416
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class MinHeap {
  constructor() {
    this.heap = [null];
    this.length = 0;
  }

  size() {
    return this.heap.length - 1;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  compare(a, b) {
    if (!(this.heap[a] && this.heap[b])) return false;
    for (let i = 0; i < this.length; i++) {
      if (this.heap[a][i] > this.heap[b][i]) return true;
      else if (this.heap[a][i] < this.heap[b][i]) return false;
    }
  }

  setElementLength(value) {
    if (typeof value === "string") this.length = 1;
    else this.length = value.length;
  }

  push(value) {
    if (!this.length) {
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

    while (
      (curIdx > 1 && this.compare(curIdx, leftIdx)) ||
      this.compare(curIdx, rightIdx)
    ) {
      const minIdx = this.compare(leftIdx, rightIdx) ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }
    return min;
  }
}

function solution(n, k, m, input) {
  let answer = -1;
  const graph = Array.from({ length: n + m + 1 }, () => new Array());
  const distance = Array.from({ length: n + m + 1 }, () => Infinity);
  for (let i = 1; i <= m; i++) {
    const hyperTube = input[i].split(" ").map(Number);
    for (let j = 0; j < k; j++) {
      graph[hyperTube[j]].push(n + i);
      graph[n + i].push(hyperTube[j]);
    }
  }
  const dijkstra = (start) => {
    const heap = new MinHeap();
    heap.push([1, start]);
    distance[start] = 1;
    while (heap.size()) {
      let [dist, now] = heap.pop();
      if (now === n) {
        answer = dist;
        break;
      }

      for (let i = 0; i < graph[now].length; i++) {
        const next = graph[now][i];
        if (distance[next] > distance[now]) {
          let cost;
          if (next > n) {
            cost = distance[now];
            distance[next] = cost;
          } else {
            cost = distance[now] + 1;
            distance[next] = cost;
          }
          heap.push([cost, next]);
        }
      }
    }
  };
  dijkstra(1);
  return answer;
}

const [N, K, M] = input[0].split(" ").map(Number);
console.log(solution(N, K, M, input));
