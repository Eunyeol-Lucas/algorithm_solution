const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(t, w, plumps) {
  let answer = 0;
  const dp = Array.from({ length: 2 }, () =>
    Array.from({ length: t }, () => new Array(w).fill(0))
  );
  dp[0][1]
  
  for (let i = 1; i < t; t++) {
    for (let j = 0; j <= w; j++) {
      dp[0][i][j] = Math.max(dp[0][])
    }
  }

  return answer;
}

const [T, W] = input[0].split(" ").map(Number);
const plumps = input.splice(1).map(Number);

console.log(solution(T, W, plumps));
