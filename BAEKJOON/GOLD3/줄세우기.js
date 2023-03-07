/**
 * 유형: 위상정렬
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [firstLine, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  push(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  pop() {
    const tmp = this.storage[this.front];
    if (tmp !== 0 && !tmp) return tmp;
    delete this.storage[this.front];
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

function solution(n, m, diff) {
  let answer = "";
  const inDegree = Array.from({ length: n + 1 }, () => 0);
  const graph = Array.from({ length: n + 1 }, () => new Array());

  for (let i = 0; i < m; i++) {
    const [a, b] = diff[i];
    graph[a].push(b);
    inDegree[b] += 1;
  }

  const topologySort = () => {
    let answer = "";
    const result = [];
    const q = new Queue();

    for (let i = 1; i <= n; i++) {
      if (inDegree[i] === 0) {
        q.push(i);
      }
    }

    while (q.size) {
      const now = q.pop();
      result.push(now);
      for (const x of graph[now]) {
        inDegree[x] -= 1;
        if (inDegree[x] === 0) q.push(x);
      }
    }
    for (const x of result) {
      answer += x + " ";
    }
    return answer;
  };
  answer = topologySort();
  return answer;
}

const [N, M] = firstLine.split(" ").map(Number);
const diff = arr.map((i) => i.split(" ").map(Number));

console.log(solution(N, M, diff));
