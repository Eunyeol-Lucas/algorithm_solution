/**
 * 유형: 다이나믹 프로그래밍
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(t, w, plumps) {
  let answer = 0;
  // dp[자두나무 위치][떨어지는 시간][움직인 횟수]
  const dp = Array.from({ length: 2 }, () =>
    Array.from({ length: t + 1 }, () => new Array(w + 2).fill(0))
  );

  for (let i = 1; i <= t; i++) {
    for (let j = 1; j <= w + 1; j++) {
      // 1번 자두나무에 떨어질 경우
      if (plumps[i] === 1) {
        // 1번 자두 나무의 경우, 이전 위치가 1번 일 경우 움직일 필요 없이 이전 값, 2번 나무에서 이동해서 총 움직인 횟수가 1회 증가하는 경우 각각 1을 더한 값의 최대값
        dp[0][i][j] = Math.max(dp[0][i - 1][j] + 1, dp[1][i - 1][j - 1] + 1);
        // 2번 자두 나무의 경우 값을 가져오기 위해 직전 값을 가져옴
        dp[1][i][j] = Math.max(dp[0][i - 1][j - 1], dp[1][i - 1][j]);
      }
      // 2번 자두나무에 떨어질 경우
      else {
        if (i === 1 && j === 1) continue;
        // 1번에 위치할 경우 이전 값을 가져옴
        dp[0][i][j] = Math.max(dp[0][i - 1][j], dp[1][i - 1][j - 1]);
        // 2번 자두나무에 위치할 경우, 이전 위치가 2번일 경우 움직일 필요 없이 이전 값, 1번 나무에서 이동해서 총 움직인 횟수가 1회 증가하는 경우 각각 1을 더한 값의 최대값
        dp[1][i][j] = Math.max(dp[0][i - 1][j - 1] + 1, dp[1][i - 1][j] + 1);
      }
    }
  }
  // 시간이 다 흐른 뒤, 이동 횟수에 따른 자두 획득량 최대값을 가져옴
  answer = Math.max(...dp[0][t], ...dp[1][t]);
  return answer;
}

const [T, W] = input[0].split(" ").map(Number);
const plumps = [0, ...input.splice(1).map(Number)];

console.log(solution(T, W, plumps));
