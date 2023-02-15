/**
 * 유형: BFS
 * BFS를 풀기 위한 Queue 구현
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [M, N] = input[0].split(" ").map(Number);
const board = input.slice(1, M + 1).map((i) => i.split(" ").map(Number));
const start = input[1 + M].split(" ").map(Number);
const end = input[2 + M].split(" ").map(Number);

// Queue 구현
class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  add(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  popleft() {
    const tmp = this.storage[this.front];
    if (!tmp) return false;
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

function solution(M, N, board, start, end) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  // 방향 전환을 위한 배열
  // 동, 서(0, 1)라면 남, 북(2, 3) 방향으로 전환
  // 남, 북(2, 3)이라면 동, 서(0, 1) 방향으로 전환 후 탐색
  const changeDir = [
    [2, 3],
    [2, 3],
    [0, 1],
    [0, 1],
  ];
  // 2차원 배열에서 동서남북 4방향의 이동을 체크하기 위한 3차원 배열 생성
  const vst = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(4).fill(0))
  );
  const [sx, sy, sd] = start;
  const [ex, ey, ed] = end;
  vst[sx - 1][sy - 1][sd - 1] = 1;

  let q = new Queue();
  q.add([sx - 1, sy - 1, sd - 1, 0]);

  while (q.size) {
    const [x, y, d, cnt] = q.popleft();
    if (x === ex - 1 && y === ey - 1 && d === ed - 1) return cnt;

    for (let i = 1; i < 4; i++) {
      const [nx, ny] = [x + directions[d][0] * i, y + directions[d][1] * i];

      if (nx < 0 || nx >= M || ny < 0 || ny >= N || board[nx][ny]) break;
      if (vst[nx][ny][d]) continue;
      q.add([nx, ny, d, cnt + 1]);
      vst[nx][ny][d] = 1;
    }

    for (const nd of changeDir[d]) {
      if (vst[x][y][nd]) continue;
      q.add([x, y, nd, cnt + 1]);
      vst[x][y][nd] = 1;
    }
  }
}

console.log(solution(M, N, board, start, end));
