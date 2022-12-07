const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin")
    : `3
5 17
*****************
.............**$*
*B*A*P*C**X*Y*.X.
*y*x*a*p**$*$**$*
*****************
cz
5 11
*.*********
*...*...*x*
*X*.*.*.*.*
*$*...*...*
***********
0
7 7
*ABCDE*
X.....F
W.$$$.G
V.$$$.H
U.$$$.J
T.....K
*SQPML*
irony`
)
  .toString()
  .trim()
  .split("\n");
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const dx = [-1, 1, 0, 0],
  dy = [0, 0, -1, 1];

const TC = +input();
let H, W;
let answer = 0;

for (let tc = 1; tc <= TC; tc++) {
  [H, W] = input().split(" ").map(Number);
  let map = Array.from(Array(H + 2), () => Array(W + 2).fill("."));
  let visit = Array.from(Array(H + 2), () => Array(W + 2).fill(false));
  let doors = Array(26);
  answer = 0;

  for (let i = 1; i <= H; i++) {
    let s = input();

    for (let j = 1; j <= W; j++) {
      map[i][j] = s.charAt(j - 1);
    }
  }

  let keys = 0;
  input()
    .split("")
    .filter((val) => val !== "0")
    .forEach((val) => {
      let idx = (val + "").charCodeAt(0) - "a".charCodeAt(0);
      keys |= 1 << idx;
    });

  let q = [];
  visit[0][0] = true;
  q.push({ x: 0, y: 0 });

  while (q.length) {
    let now = q.shift();

    for (let d = 0; d < 4; d++) {
      let nx = now.x + dx[d],
        ny = now.y + dy[d];

      if (!inRange(nx, ny) || visit[nx][ny] || map[nx][ny] === "*") continue;

      let next = map[nx][ny];

      if (next === "$") {
        answer++;
        map[nx][ny] = ".";
      } else if (next >= "A" && next <= "Z") {
        let idx = (next + "").charCodeAt(0) - "A".charCodeAt(0);

        if (!(keys & (1 << idx))) {
          if (!doors[idx]) doors[idx] = [];
          doors[idx].push({ x: nx, y: ny });
          continue;
        }

        map[nx][ny] = ".";
      } else if (next >= "a" && next <= "z") {
        let idx = (next + "").charCodeAt(0) - "a".charCodeAt(0);
        keys |= 1 << idx;
        map[nx][ny] = ".";

        while (doors[idx]?.length) q.push(doors[idx].pop());
      }

      visit[nx][ny] = true;
      q.push({ x: nx, y: ny });
    }
  }

  console.log(answer);
}

function inRange(x, y) {
  return x >= 0 && x < H + 2 && y >= 0 && y < W + 2;
}
