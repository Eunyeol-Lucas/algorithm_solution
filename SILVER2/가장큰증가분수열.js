const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  const dp = Array.from({ length: n }, () => 0);
  dp[0] = arr[0];
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + arr[i]);
      }
    }
    if (dp[i] === 0) {
      dp[i] = arr[i];
    }
  }
  return Math.max(...dp)
}

const N = +input[0];
const arr = input[1].split(" ").map(Number);
console.log(solution(N, arr));
