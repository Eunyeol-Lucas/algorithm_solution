const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  let answer = "";

  const set = new Set(arr);
  const tmpArr = [...set].sort((a, b) => a - b);
  const obj = {};
  tmpArr.forEach((e, idx) => {
    obj[e] = idx;
  });
  arr.map((e, idx) => {
    answer += obj[arr[idx]] + " ";
  });
  return answer;
}
arr = arr[0].split(" ").map(Number);
console.log(solution(N, arr));
