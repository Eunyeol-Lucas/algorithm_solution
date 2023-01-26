const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(x) {
  const dp = Array.from({ length: x + 1 }, () => 0);
  for (let i = 2; i < x + 1; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }
  return dp[x];
}

const X = +input[0];
console.log(solution(X));
