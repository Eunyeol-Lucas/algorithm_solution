// 방문 체크해서 이전 기록보다 적게 이동한 경우에만 이동 가능
let input = require("fs").readFileSync("예제.txt").toString().split("\n");
const N = +input.shift();
const [r1, c1, r2, c2] = input
  .shift()
  .split(" ")
  .map((i) => +i);

function solution(N, r1, c1, r2, c2) {
  const directList = [
    [-2, -1],
    [-2, 1],
    [0, -2],
    [0, 2],
    [2, -1],
    [2, 1],
  ];
  const vst = Array.from({ length: N }, (_) => Array(N).fill(1e9));
  const q = [[r1, c1]];
  vst[r1][c1] = 0;
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dx, dy] of directList) {
      const nx = r + dx,
        ny = c + dy;
      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < N &&
        vst[nx][ny] > vst[r][c] + 1
      ) {
        vst[nx][ny] = vst[r][c] + 1;

        q.push([nx, ny]);
      }
    }
  }
  return vst[r2][c2] < 1e9 ? vst[r2][c2] : -1;
}

console.log(solution(N, r1, c1, r2, c2));
