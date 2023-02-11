const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enQueue(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  deQueue() {
    const tmp = this.storage[this.front];
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front++;
    }
    if (this.size) this.size--;
    return tmp;
  }
}

function solution(n, k, m, hyperTubes) {
  const graph = Array.from({ length: N + M + 1 }, () => new Array());
  for (let i = 0; i < m; i++) {
    const hyperTube = hyperTubes[i].split(" ").map(Number);
    for (let j = 0; j < k; j++) {}
  }

  console.log(graph);
  const queue = new Queue();
  queue.enQueue([1, 1]);
  while (queue.size) {
    const [t, cnt] = queue.deQueue();
    if (t === n) return cnt;
    for (const x of graph[t]) {
      queue.enQueue([x, cnt + 1]);
    }
  }
  return -1;
}

const [N, K, M] = input[0].split(" ").map(Number);
const hyperTubes = input.slice(1);

console.log(solution(N, K, M, hyperTubes));
