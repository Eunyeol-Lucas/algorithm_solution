const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const M = +input.pop();
const arr = input[0].split(" ").map(Number);

function solution(N, M, arr) {
  const sumList = Array.from({ length: N + 1 }, () => 0);
  const dp = Array.from({ length: 4 }, () => new Array(N + 1).fill(0));
  for (let i = 1; i < N + 1; i++) {
    sumList[i] = sumList[i - 1] + arr[i - 1];
  }
  for (let i = 1; i < 4; i++) {
    for (let j = i * M; j < N + 1; j++) {
      dp[i][j] = Math.max(
        dp[i][j - 1],
        dp[i - 1][j - M] + sumList[j] - sumList[j - M]
      );
    }
  }
  return dp[3][N];
}

console.log(solution(N, M, arr));
