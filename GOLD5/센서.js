const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const K = +input[1];
const sensors = input[2].split(" ").map(Number);

function solution(N, K, sensors) {
  if (K >= N) return 0;

  const arr = [];
  let answer = 0;

  sensors.sort((a, b) => a - b);

  for (let i = 0; i < N - 1; i++) {
    arr.push(sensors[i + 1] - sensors[i]);
  }

  arr.sort((a, b) => b - a);
  for (let i = K - 1; i < N - 1; i++) {
    answer += arr[i];
  }

  return answer;
}

console.log(solution(N, K, sensors));
