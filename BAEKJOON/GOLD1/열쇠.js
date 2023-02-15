const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const makeUpperCase = (key) => {
  const upper = String.fromCharCode(key.charCodeAt(0) - 32);
  return upper;
};

const directions = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
];

function solution(h, w, board, keys) {
  let answer = 0;

  const vst = Array.from({ length: h + 2 }, () => Array(w + 2).fill(false));

  const UpperKeyList = [];
  if (keys !== "0") {
    for (let i = 0; i < keys.length; i++) {
      const k = keys.charCodeAt(i);
      const x = String.fromCharCode(k - 32);
      UpperKeyList.push(x);
    }
  }
  const doors = Array(26);
  const q = [[0, 0]];
  vst[0][0] = true;
  while (q.length) {
    const [x, y] = q.shift();
    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      if (
        nx < 0 ||
        ny >= h + 2 ||
        ny < 0 ||
        ny >= w + 2 ||
        vst[nx][ny] ||
        board[nx][ny] === "*"
      )
        continue;
      vst[nx][ny];
      if (board[nx][ny] === "$") {
        answer++;
        board[nx][ny] = ".";
      } else if (board[nx][ny] >= "A" && board[nx][ny] <= "Z") {
        if (UpperKeyList.includes(board[nx][ny])) {
          board[nx][ny] = ".";
        }
        const idx = board[nx][ny].charCodeAt(0) - 65;
        if (!doors[idx]) doors[idx] = [];
        doors[idx].push([nx, ny]);
        continue;
      } else {
        const key = makeUpperCase(board[nx][ny]);
        UpperKeyList.push(key);
        board[nx][ny] = ".";
        const idx = board[nx][ny].charCodeAt(0) - 97;
        while (doors[idx]?.length) q.push(doors[idx].pop());
      }
      vst[nx][ny] = true;
      q.push([nx, ny]);
    }
  }

  return answer;
}

const T = +input[0];
let idx = 1;
for (let i = 0; i < T; i++) {
  const [H, W] = input[idx].split(" ").map(Number);
  const BOARD = Array.from({ length: H + 2 }, () => Array(W + 2).fill("."));
  // const BOARD = input.slice(idx + 1, idx + H + 1).map((i) => [...i]);
  for (let i = 1; i <= H; i++) {
    const s = input[idx + i];
    for (let j = 1; j <= W; j++) {
      BOARD[i][j] = s[j - 1];
    }
  }
  const KEYS = input[idx + 1 + H];

  idx += 2 + H;
  console.log(solution(H, W, BOARD, KEYS));
}
