const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const A = input.splice(0, N).map((i) => [...i].map(Number));
const B = input.map((i) => [...i].map(Number));

function convert(x, y) {
  for (let i = x; i < x + 3; i++) {
    for (let j = y; j < y + 3; j++) {
      if (A[i][j] === 0) A[i][j] = 1;
      else A[i][j] = 0;
    }
  }
}

function solution(N, M, A, B) {
  let answer = 0;
  if (N < 3 || M < 3) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (A[i][j] !== B[i][j]) return -1;
      }
    }
    return 0;
  }

  for (let i = 0; i < N - 2; i++) {
    for (let j = 0; j < M - 2; j++) {
      if (A[i][j] !== B[i][j]) {
        answer++;
        convert(i, j);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (A[i][j] !== B[i][j]) {
        return -1;
      }
    }
  }

  return answer;
}

console.log(solution(N, M, A, B));
