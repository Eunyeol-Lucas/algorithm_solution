const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const M = +input.shift();

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  swap(a, b) {
    [this.values[a], this.values[b]] = [this.values[b], this.values[a]];
  }

  size() {
    return this.values.length;
  }

  enqueue(value) {
    this.values.push(value);
    let idx = this.size() - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.values[idx].cost >= this.values[parent].cost) break;
      this.swap(parent, idx);
      idx = parent;
    }
  }
  dequeue() {
    if (this.size() < 1) return null;

    const res = this.values.shift();
    if (this.size() === 0) return res;

    this.values.unshift(this.values.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.size()) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.values[left].cost < this.values[next].cost) next = left;
      if (
        right < this.size() &&
        this.values[right].cost < this.values[next].cost
      )
        next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
}

function solution(N, M, input) {
  const [A, B] = input.pop().split(" ").map(Number);
  const arr = input.map((i) => i.split(" ").map(Number));
  const graph = Array.from({ length: N + 1 }, () => new Object());
  for (const [a, b, c] of arr) {
    if (graph[a][b] === undefined) {
      graph[a][b] = c;
    } else {
      if (graph[a][b] > c) graph[a][b] = c;
    }
  }
  console.log(graph);
  const distances = Array(N + 1).fill(Infinity);
  function dijkstra(start) {
    const q = new PriorityQueue();
    q.enqueue({ node: start, cost: 0 });
    distances[start] = 0;
    while (q.size() > 0) {
      const { node, cost: currentCost } = q.dequeue();
      if (distances[node] < currentCost) continue;
      for (const dest in graph[node]) {
        let cost = currentCost + graph[node][dest];
        if (cost < distances[dest]) {
          distances[dest] = cost;
          q.enqueue({ node: dest, cost });
        }
      }
    }
  }
  dijkstra(A);
  return distances[B];
}

console.log(solution(N, M, input));
