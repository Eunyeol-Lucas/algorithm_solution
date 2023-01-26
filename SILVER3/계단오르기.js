/**
 * 유형: 다이나믹 프로그래밍
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, stairs) {
  const dp = Array.from({ length: n + 1 }, () => new Array(2).fill(0));
  dp[1][1] = stairs[0];

  for (let i = 2; i <= n; i++) {
    dp[i][0] = Math.max(
      dp[i - 1][1] + stairs[i - 1],
      dp[i - 2][0] + stairs[i - 1]
    );
    dp[i][1] = Math.max(
      dp[i - 2][0] + stairs[i - 1],
      dp[i - 2][1] + stairs[i - 1]
    );
  }
  return Math.max(...dp[n]);
}

const N = +input[0];
const stairs = input.slice(1).map(Number);
console.log(solution(N, stairs));
