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
    if (!tmp) return tmp;
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front++;
    }
    this.size--;
    return tmp;
  }
}

function solution(n, m, v, arr) {
  let answer = "";

  const graph = Array.from({ length: n + 1 }, () => new Array());
  const vst = Array.from({ length: n + 1 }, () => 0);

  for (let [a, b] of arr) {
    graph[a].push(b);
    graph[b].push(a);
  }

  for (const x of graph) x.sort((a, b) => a - b);

  const dfs = (t) => {
    answer += t + " ";
    vst[t] = 1;

    for (const x of graph[t]) {
      if (!vst[x]) {
        dfs(x);
      }
    }
  };

  const bfs = (t) => {
    const queue = new Queue();
    const visited = Array.from({ length: n + 1 }, () => 0);
    queue.enQueue(t);
    visited[t] = 1;
    while (queue.size) {
      const v = queue.deQueue();
      answer += v + " ";
      for (const x of graph[v]) {
        if (!visited[x]) {
          visited[x] = 1;
          queue.enQueue(x);
        }
      }
    }
  };

  dfs(v);
  answer += "\n";
  bfs(v);

  return answer;
}

const [N, M, V] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((i) => i.split(" ").map(Number));
console.log(solution(N, M, V, arr));
