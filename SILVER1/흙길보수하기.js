/**
 * Greedy
 * 떨어져있어도 연속해서 하나의 판자로 연결이 가능한 경우
 * 최소값이된다.
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, L] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((i) => i.split(" ").map(Number));

function solution(L, arr) {
  let answer = 0;
  arr.sort((a, b) => a[0] - b[0]);
  let position = 0;
  for (const [start, end] of arr) {
    if (end <= position) continue;
    const maxStartPoint = Math.max(position, start);
    const count = Math.ceil((end - maxStartPoint) / L);
    answer += count;
    position = maxStartPoint + count * L;
  }

  return answer;
}

console.log(solution(L, arr));
