/**
 * 유형: DP
 * 메모리: 9616kb, 시간: 132ms
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  for (let i = 1; i < n; i++) {
    arr[i][0] += Math.min(arr[i - 1][1], arr[i - 1][2]);
    arr[i][1] += Math.min(arr[i - 1][0], arr[i - 1][2]);
    arr[i][2] += Math.min(arr[i - 1][0], arr[i - 1][1]);
  }
  return Math.min(...arr[n - 1]);
}

const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" ").map(Number));
console.log(solution(N, arr));
