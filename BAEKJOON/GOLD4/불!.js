/**
 * 유형: 그래프이론, 너비우선탐색
 */

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
    if (!tmp) return null;
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

function solution(input) {
  const [R, C] = input[0].split(" ").map(Number);
  const board = input.slice(1).map((i) => i.split(""));
  const F = "F";
  const J = "J";
  const W = "#";
  const N = ".";

  //  #: 벽
  // .: 지나갈 수 있는 공간
  // J: 지훈이의 미로에서의 초기위치 (지나갈 수 있는 공간)
  // F: 불이 난 공간
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const queue = new Queue();
  let startPosition;
  // 지훈의 위치와 불이난 위치를 Queue애 입력
  // 불이난 위치는 별도의 cnt를 계산하지 안힉 위해 -1로 지정
  for (let i = 1; i <= R; i++) {
    for (let j = 0; j < C; j++) {
      if (input[i][j] === J) {
        startPosition = [i - 1, j];
      } else if (input[i][j] === F) {
        queue.enQueue([i - 1, j, -1]);
      }
    }
  }
  queue.enQueue([...startPosition, 0]);
  while (queue.size) {
    const [x, y, cnt] = queue.deQueue();
    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      // 이동하는 좌표가 기준 범위를 벗어난 경우
      // 지훈가 이동한 거리 + 1을 반환
      if (nx < 0 || nx >= R || ny < 0 || ny >= C) {
        if (cnt < 0) continue;
        return cnt + 1;
      }
      // 이동 범위가 기준 범위 내 인 경우
      // 벽 또는 불일 경우 pass, 아닐 경우 재방하지 않도록 벽으로 바꿈
      if (board[nx][ny] !== N) continue;
      board[nx][ny] = W;
      // 지훈이가 이동하는 경우에만 cnt + 1을 한 값을 queue 입력
      queue.enQueue([nx, ny, cnt < 0 ? -1 : cnt + 1]);
    }
  }
  return "IMPOSSIBLE";
}

console.log(solution(input));
