const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const arr = input.map((i) => i.split(" ").map(Number));
console.log(solution(N, arr));

function solution(N, arr) {
  let answer = 0;
  const times = arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else return a[1] - b[1];
  });

  let last = 0;
  times.forEach((time) => {
    if (time[0] >= last) {
      answer++;
      last = time[1];
    }
  });
  return answer;
}
