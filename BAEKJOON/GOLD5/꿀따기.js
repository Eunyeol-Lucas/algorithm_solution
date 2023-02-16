const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution(n, honeys) {
  let answer = 0;
  const sum = honeys.reduce((cur, acc) => acc + cur, 0);
  // 벌 - 벌 -꿀 순서
  let tmp = honeys[0];
  for (let i = 1; i < n - 1; i++) {
    tmp += honeys[i];
    answer = Math.max(answer, 2 * sum - honeys[i] - honeys[0] - tmp);
  }

  // 꿀 - 벌 - 벌 순서
  tmp = honeys[n - 1];
  for (let i = n - 2; i > 0; i--) {
    tmp += honeys[i];
    answer = Math.max(answer, 2 * sum - honeys[i] - honeys[n - 1] - tmp);
  }
  // 양 끝에 벌, 중간에 꿀
  for (let i = 1; i < n; i++) {
    answer = Math.max(answer, sum - honeys[0] - honeys[n - 1] + honeys[i]);
  }
  return answer;
}

const N = +input[0];
const honeys = input[1].split(" ").map(Number);
console.log(solution(N, honeys));
