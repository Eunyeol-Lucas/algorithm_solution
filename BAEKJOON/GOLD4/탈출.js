const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [R, C] = input.shift().split(" ").map(Number);

const directList = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solution(R, C, input) {
  let start, target;
  const waterList = [];
  const WATER = "*";
  const EMPTY = ".";
  const STONE = "X";
  const vst = Array.from({ length: R }, () => Array(C).fill(0));
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (input[i][j] === "S") {
        start = [i, j];
        vst[i][j] = 2;
      }
      if (input[i][j] === "D") {
        target = [i, j];
      }
      if (input[i][j] === WATER) {
        waterList.push([i, j]);
        vst[i][j] = 1;
      }
      if (input[i][j] === STONE) {
        vst[i][j] = 1;
      }
    }
  }
  const q = [[start[0], start[1], 0]];
  while (q.length) {
    const length = waterList.length;
    for (let k = 0; k < length; k++) {
      const [i, j] = waterList.shift();

      for (const [dx, dy] of directList) {
        const [ni, nj] = [i + dx, j + dy];
        if (
          ni >= 0 &&
          ni < R &&
          nj >= 0 &&
          nj < C &&
          vst[ni][nj] !== 1 &&
          input[ni][nj] !== "D"
        ) {
          vst[ni][nj] = 1;
          waterList.push([ni, nj]);
        }
      }
    }
    const qLength = q.length;
    for (let k = 0; k < qLength; k++) {
      const [x, y, cnt] = q.shift();
      if (x === target[0] && y === target[1]) {
        return cnt;
      }
      for (const [dx, dy] of directList) {
        const [nx, ny] = [x + dx, y + dy];
        if (nx >= 0 && nx < R && ny >= 0 && ny < C && vst[nx][ny] === 0) {
          vst[nx][ny] = 2;
          q.push([nx, ny, cnt + 1]);
        }
      }
    }
  }
  return "KAKTUS";
}

console.log(solution(R, C, input));
