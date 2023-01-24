const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
const T = +input[0];
function solution(n) {
  let answer = 0;
  if (n === 1) return 1;
  if (n === 2) return 5;
}

let answer = "";
for (let i = 1; i <= T; i++) {
  const N = +input[i];
  answer += solution(N) + "\n";
}
console.log(answer);
