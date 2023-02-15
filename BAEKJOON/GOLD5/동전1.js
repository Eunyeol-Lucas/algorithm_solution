// 백준 기준 메모리 초과 (정답 케이스 없음)

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, K] = input.shift().split(" ").map(Number);
input = input.map(Number);

function solution(N, K, input) {
  const dp = Array(K + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < N; i++) {
    for (let j = input[i]; j <= K; j++) {
      dp[j] += dp[j - input[i]];
    }
  }
  return dp[K];
}

console.log(solution(N, K, input));