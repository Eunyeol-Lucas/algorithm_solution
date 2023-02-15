const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  const answer = [];
  const graph = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(Infinity)
  );

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    const [a, b, c] = arr[i];
    graph[a][b] = c;
    graph[b][a] = c;
  }

  for (let k = 1; k <= n; k++) {
    for (let a = 1; a <= n; a++) {
      for (let b = 1; b <= n; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    let sum = graph[i].reduce((acc, cur) => {
      if (cur !== Infinity) acc += cur;
      return acc;
    }, 0);
    answer.push(sum);
  }

  return answer.join("\n");
}

const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" ").map(Number));
console.log(solution(N, arr));
