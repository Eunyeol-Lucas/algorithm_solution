const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input[0];

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  swap(a, b) {
    [this.values[a], this.values[b]] = [this.values[b], this.values[a]];
  }

  enqueue(value, priority) {
    this.values.push({ value, priority });
    let idx = this.values.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.values[idx].priority >= this.values[parent].priority) break;
      this.swap(parent, idx);
      idx = parent;
    }
  }
  dequeue() {
    if (this.values.length < 1) return null;

    const res = this.values.shift();
    if (this.values.length === 0) return res;

    this.values.unshift(this.values.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.values.length) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.values[left].priority < this.values[next].priority) next = left;
      if (
        right < this.values.length &&
        this.values[right].priority < this.values[next].priority
      )
        next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    nodes.enqueue(start, 0);
    const distances = {};
    const previous = {};
    const path = [];
    let smallest;

    for (const vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
      } else {
        distances[vertex] = Infinity;
      }
      previous[vertex] = null;
    }

    while (true) {
      smallest = nodes.dequeue().value;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      } else {
        for (const neighbor in this.adjacencyList[smallest]) {
          const nextNode = this.adjacencyList[smallest][neighbor];

          const candidate = distances[smallest] + nextNode.weight;
          const nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

function solution(N, board, K, location) {
  const graph = new WeightedGraph();
  for (let i = 1; i <= N; i++) {
    graph.addVertex(i);
  }
  for (const [a, b, c] of board) {
    graph.addEdge(a, b, c);
  }
}

let N,
  M = 0,
  C = 2;

for (let i = 0; i < T; i++) {
  [N, M] = input[1 + M].split(" ").map(Number);
  const board = input.slice(C, C + M).map((i) => i.split(" ").map(Number));

  const K = +input[C + M];
  const location = input[C + M + 1].split(" ").map(Number);
  C += M + 3;

  console.log(solution(N, board, K, location));
}
