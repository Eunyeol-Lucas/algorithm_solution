const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const graph = input.map((i) => [...i].map(Number));
const directList = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solution(N, M, graph) {
  const vst1 = Array.from({ length: N }, () => Array(M).fill(0));
  const vst2 = Array.from({ length: N }, () => Array(M).fill(0));
  const answer = Array.from({ length: N }, () => Array(M).fill(0));

  const wallList = [];
  let index = 1;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j]) wallList.push([i, j]);
      else if (vst1[i][j] === 0) {
        const q = [[i, j]];
        vst1[i][j] = index;
        let idx = 0;
        while (idx < q.length) {
          const [x, y] = q[idx++];
          for (const [dx, dy] of directList) {
            const [nx, ny] = [x + dx, y + dy];
            if (
              nx >= 0 &&
              nx < N &&
              ny >= 0 &&
              ny < M &&
              graph[nx][ny] === 0 &&
              vst1[nx][ny] === 0
            ) {
              vst1[nx][ny] = index;
              q.push([nx, ny]);
            }
          }
        }
        q.forEach((i) => (vst2[i[0]][i[1]] = q.length));
        index++;
      }
    }
  }

  for (const [x, y] of wallList) {
    answer[x][y] = 1;
    const set = new Set();
    for (const [dx, dy] of directList) {
      const [nx, ny] = [x + dx, y + dy];
      if (
        nx >= 0 &&
        nx < N &&
        ny >= 0 &&
        ny < M &&
        graph[nx][ny] === 0 &&
        !set.has(vst1[nx][ny])
      ) {
        set.add(vst1[nx][ny]);
        answer[x][y] += vst2[nx][ny];
      }
    }
    answer[x][y] %= 10;
  }
  answer.forEach((i) => console.log(i.join("")));
}
solution(N, M, graph);
