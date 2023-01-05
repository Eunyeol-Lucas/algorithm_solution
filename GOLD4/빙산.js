const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const graph = input.slice(1).map((i) => i.split(" ").map(Number));

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    if (this.storage[this.rear] === undefined) return 0;
    else {
      return this.rear - this.front + 1;
    }
  }

  add(value) {
    if (this.size() === 0) this.storage["0"] = value;
    else {
      this.rear++;
      this.storage[this.rear] = value;
    }
  }

  popleft() {
    let tmp;
    if (this.front === this.rear) {
      tmp = this.storage[this.front];
      delete this.storage[this.front];
      this.front = 0;
      this.rear = 0;
    } else {
      tmp = this.storage[this.front];
      delete this.storage[this.front];
      this.front++;
    }
    return tmp;
  }
}

const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

// 빙산의 사방을 탐색하며 1씩 녹여줌
function falling(x, y, vst) {
  vst[x][y] = 1;
  for (const [dx, dy] of directions) {
    const [nx, ny] = [x + dx, y + dy];
    if (
      nx >= 0 &&
      nx < N &&
      ny >= 0 &&
      ny < M &&
      graph[nx][ny] === 0 &&
      graph[x][y] > 0 &&
      vst[nx][ny] === 0
    ) {
      graph[x][y]--;
    }
  }
}

// 몇개의 덩어리인지 확인
function bfs(i, j, vst) {
  const q = new Queue();
  q.add([i, j]);
  vst[i][j] = 0;
  while (q.size()) {
    const [x, y] = q.popleft();
    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      if (
        nx >= 1 &&
        nx < N - 1 &&
        ny >= 1 &&
        ny < M - 1 &&
        graph[nx][ny] &&
        vst[nx][ny]
      ) {
        vst[nx][ny] = 0;
        q.add([nx, ny]);
      }
    }
  }
}

function solution(N, M, graph) {
  let answer = 0;
  let result = 0;
  let flag = true;
  while (result < 2 && flag) {
    const vst = Array.from({ length: N }, () => Array(M).fill(0));
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (graph[i][j] !== 0) falling(i, j, vst);
      }
    }
    result = 0;
    flag = false;
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (graph[i][j] !== 0 && vst[i][j] === 1) {
          flag = true;
          bfs(i, j, vst);
          result++;
        }
      }
    }
    answer++;
  }

  return flag ? answer : 0;
}

console.log(solution(N, M, graph));
