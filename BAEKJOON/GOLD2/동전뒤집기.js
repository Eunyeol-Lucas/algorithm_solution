const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const graph = input.map((i) => [...i]);

function solution(N, graph) {
  let answer = 1e9;

  const changeRow = (row) => {
    for (let i = 0; i < N; i++) {
      if (graph[row][i] === "T") {
        graph[row][i] = "H";
      } else {
        graph[row][i] = "T";
      }
    }
  };

  const check = () => {
    let cnt = 0;
    for (let i = 0; i < N; i++) {
      let t = 0;
      for (let j = 0; j < N; j++) {
        if (graph[j][i] === "T") t++;
      }
      cnt += Math.min(t, N - t);
    }
    return cnt;
  };

  for (let i = 0; i < 1 << N; i++) {
    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        changeRow(j);
      }
    }

    let res = check();
    answer = Math.min(answer, res);

    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        changeRow(j);
      }
    }
  }
  return answer;
}

console.log(solution(N, graph));
