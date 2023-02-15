const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim();

function solution(input) {
  let answer = 0;
  const tmp = input.split("-");
  for (const x of tmp.shift().split("+")) {
    answer += +x;
  }

  for (const x of tmp) {
    for (const y of x.split("+")) {
      answer -= +y;
    }
  }
  return answer;
}

console.log(solution(input));
