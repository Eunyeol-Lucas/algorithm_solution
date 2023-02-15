/**
 * 유형: 다이나믹 프로그래밍
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
const T = +input[0];

/**
 * function 만들었을 때: 12204kb	116ms
 * function 안만들었을 때: 9632kb	204ms
 */
  const dp = Array.from({ length: 30 }, () => 0);
  dp[1] = 1;
  dp[2] = 5;
  for (let i = 3; i <= 30; i++) {
    let a = 4;
    let b = 3;
    dp[i] += dp[i - 1] + dp[i - 2] * 4;
    while (a <= i - 1) {
      dp[i] = dp[i] + dp[i - a] * 3;
      a += 2;
    }
    while (b <= i - 1) {
      dp[i] = dp[i] + dp[i - b] * 2;
      b += 2;
    }
    if (i % 2 === 0) dp[i] += +3;
    else dp[i] += 2;
  }

let answer = "";
for (let i = 1; i <= T; i++) {
  const N = +input[i];
  answer += dp[N] + "\n";
}
console.log(answer);
