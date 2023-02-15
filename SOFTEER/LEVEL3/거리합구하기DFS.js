const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  const graph = Array.from({ length: n + 1 }, () => new Array());
  const distance = Array.from({ length: n + 1 }, () => 0);
  for (let i = 0; i < arr.length; i++) {
    const [a, b, c] = arr[i];
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }
  const dfs1 = (current, parent) => {
    distance[current] = 1;
    for (let i = 0; i < graph[current].length; i++) {
      child = graph[current][i][0];
      if (child !== parent) {
        console.log([child, current]);
        dfs1(child, current);
        console.log([child, current]);
        // console.log(current, parent, child, distance[current], distance[child]);
        // console.log(current);
        distance[current] += distance[child];
      }
    }
  };

  dfs1(1, 1);
  console.log(distance);
}

const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" ").map(Number));
console.log(solution(N, arr));
