const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

const graph = input.map((i) => [...i].map(Number));

console.log(solution(N, M, graph));

function solution(N, M, graph) {
  const directs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const vst = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(0))
  );

  const q = [[0, 0, 0]];
  vst[0][0][0] = 1;
  let idx = 0;
  while (idx !== q.length) {
    const [x, y, flag] = q[idx++];

    if (x === N - 1 && y === M - 1) {
      return vst[x][y][flag];
    }

    for (const [dx, dy] of directs) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (graph[nx][ny] === 0 && vst[nx][ny][flag] === 0) {
          vst[nx][ny][flag] = vst[x][y][flag] + 1;
          q.push([nx, ny, flag]);
        } else if (graph[nx][ny] === 1 && flag === 0) {
          vst[nx][ny][1] = vst[x][y][flag] + 1;
          q.push([nx, ny, 1]);
        }
      }
    }
  }
  return -1;
}
