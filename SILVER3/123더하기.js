const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n) {
  const dp = Array.from({ length: n + 1 }, () => 0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;
  dp[4] = 7;
  for (let i = 4; i < n + 1; i++) {
    dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

const T = +input[0];
for (let i = 1; i <= T; i++) {
  const N = +input[i];
  console.log(solution(N));
}
