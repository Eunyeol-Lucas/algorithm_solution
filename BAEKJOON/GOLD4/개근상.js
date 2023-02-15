/**
 * 유형: dfs + dp
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const MOD = 1000000;
function solution(n) {
  const dp = Array.from(Array(n), () =>
    Array.from(Array(2), () => Array(3).fill(0))
  );
  const dfs = (o, l, a) => {
    if (l === 2 || a === 3) return 0;
    if (o === n) return 1;
    if (dp[o][l][a] !== 0) return dp[o][l][a];
    dp[o][l][a] += dfs(o + 1, l, 0);
    dp[o][l][a] += dfs(o + 1, l + 1, 0);
    dp[o][l][a] += dfs(o + 1, l, a + 1);
    return dp[o][l][a] % MOD;
  };

  return dfs(0, 0, 0);
}

console.log(solution(+input[0]));
