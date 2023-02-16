/**
 * 유형: 그리디
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution(n, ropes) {
  let answer = 0;
  ropes.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    answer = Math.max(answer, rope[i] * (n - i));
  }
  return answer;
}
const N = +input[0];
const rope = input.slice(1).map(Number);

console.log(solution(N, rope));
