/**
 * DFS를 그리디하게 탐색
 * ny와 nx의 값이 graph를 벗어나지 않으면서 방문하지 않은 좌표의 경우 DFS를 호출
 * DFS의 return 값이 false인 경우가 아니면 파이프를 설치할 수 있으므로 다음 경로를 탐색하지 않아도됨.
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const graph = input.splice(1);

function solution(R, C, graph) {
  let answer = 0;

  const vst = Array.from({ length: R }, () => Array(C).fill(-1));

  function dfs(y, x) {
    if (x === C - 1) return true;
    for (const dy of [-1, 0, 1]) {
      const ny = y + dy;
      const nx = x + 1;
      if (ny >= 0 && ny < R && nx >= 0 && nx < C) {
        if (graph[ny][nx] !== "x" && vst[ny][nx] === -1) {
          vst[ny][nx] = 1;
          if (dfs(ny, nx)) {
            return true;
          }
        }
      }
    }
  }
  for (let i = 0; i < R; i++) {
    if (dfs(i, 0)) answer++;
  }

  return answer;
}

console.log(solution(R, C, graph));
