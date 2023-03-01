/**
 * 유형: DFS, BFS
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
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

  popLeft() {
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

function solution(n, arr) {
  const graph = Array.from({ length: n + 1 }, () => new Array());
  const dist = Array.from({ length: n + 1 }, () => 0);

  for (const [a, b] of arr) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let circle;
  const vst = Array.from({ length: n + 1 }, () => 0);

  // dfs를 통해 순환선 여부 확인
  const dfs = (start, order) => {
    if (circle) return;
    for (const x of graph[start]) {
      if (vst[x] === 0) {
        vst[x] = vst[start] + 1;
        dfs(x, [...order, x]);
        vst[x] = 0;
      }
      // 다음 방문할 역이 방문했던 역이고, 현재 역과 1 초과 차이가 난다면,
      // 순환하고 있는 것임.
      else if (vst[start] - vst[x] !== 1) {
        circle = order.slice(order.indexOf(x));
        return;
      }
    }
  };
  // 순환선으로부터 역이 얼마나 떨어져있는지 확인
  const bfs = () => {
    const q = new Queue();
    for (const x of circle) {
      q.push(x);
    }
    while (q.size) {
      const tmp = q.popLeft();
      for (const x of graph[tmp]) {
        if (!dist[x] && !circle.includes(x)) {
          dist[x] = dist[tmp] + 1;
          q.push(x);
        }
      }
    }
  };

  vst[1] = 1;
  dfs(1, [1]);
  bfs();
  return dist.slice(1).join(" ");
}
const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" ").map(Number));

console.log(solution(N, arr));
