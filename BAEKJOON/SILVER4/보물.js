const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  arr[0].sort((a, b) => a - b);
  arr[1].sort((a, b) => b - a);
  const sum = arr[0].reduce((acc, cur, idx) => acc + cur * arr[1][idx], 0);
  return sum;
}
const reArr = arr.map((i) => i.split(" ").map(Number));
console.log(solution(N, reArr));
