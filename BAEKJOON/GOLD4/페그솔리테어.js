const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input[0];
let idx = 1;
const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function solution(arr) {
  let pins = 0,
    move = 0;
  function dfs() {}

  return [pins, move];
}

for (let i = 0; i < T; i++) {
  const arr = [];
  while (true) {
    const tmp = input[idx];
    idx++;
    if (!tmp) break;
    arr.push(tmp);
  }
  console.log(solution(arr).join(" "));
}
