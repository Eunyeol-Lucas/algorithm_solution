const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const matrix = input.map((i) => i.split(" ").map(Number));

function solution(N, matrix) {
  const dp = Array.from({ length: N }, () => Array(N).fill(Infinity));
  for (let i = 0; i < N; i++) {
    dp[i][i] = 0;
  }
  for (let i = 1; i < N; i++) {
    for (let start = 0; start < N; start++) {
      const end = start + i;
      if (end >= N) break;
      for (let target = start; target < end; target++) {
        dp[start][end] = Math.min(
          dp[start][end],
          dp[start][target] +
            dp[target + 1][end] +
            matrix[start][0] * matrix[target + 1][0] * matrix[end][1]
        );
      }
    }
  }
  return dp[0][N - 1];
}

console.log(solution(N, matrix));
