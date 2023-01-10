const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input[0];

function solution(arr) {
  let answer = "YES";
  arr.sort((a, b) => a.localeCompare(b));
  const regex = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].startsWith(regex)) {
      answer = "NO";
      break;
    }
  }

  return answer;
}

let idx = 1;
for (let i = 0; i < T; i++) {
  const N = +input[idx];
  const arr = input.slice(idx + 1, idx + 1 + N);
  console.log(solution(arr));
  idx += N + 1;
}
