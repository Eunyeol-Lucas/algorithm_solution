/**
 * 유형: 플로이드워셜
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, m, graph, arr) {
  for (let k = 0; k < n; k++) {
    for (let a = 0; a < n; a++) {
      for (let b = 0; b < n; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }

  let answer = "";
  for (let i = 0; i < m; i++) {
    const [a, b, c] = arr[i];
    if (graph[a - 1][b - 1] <= c) answer += "Enjoy other party" + "\n";
    else answer += "Stay here" + "\n";
  }
  return answer;
}

const [N, M] = input[0].split(" ").map(Number);

const graph = input.slice(1, N + 1).map((i) => i.split(" ").map(Number));

const arr = input.slice(N + 1, N + 2 + M).map((i) => i.split(" ").map(Number));
console.log(solution(N, M, graph, arr));
