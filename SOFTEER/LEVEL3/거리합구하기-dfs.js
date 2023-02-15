const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  const graph = Array.from({ length: n + 1 }, () => new Array());
  const subTreeSizeList = Array.from({ length: n + 1 }, () => 0);
  const distanceSumList = Array.from({ length: n + 1 }, () => 0);
  for (let i = 0; i < arr.length; i++) {
    const [a, b, c] = arr[i];
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }
  const dfs1 = (current, parent) => {
    subTreeSizeList[current] = 1;
    for (let i = 0; i < graph[current].length; i++) {
      const child = graph[current][i][0];
      const weight = graph[current][i][1];
      if (child !== parent) {
        dfs1(child, current);
        distanceSumList[current] +=
          distanceSumList[child] + subTreeSizeList[child] * weight;
        subTreeSizeList[current] += subTreeSizeList[child];
      }
    }
  };

  const dfs2 = (current, parent) => {
    for (let i = 0; i < graph[current].length; i++) {
      const child = graph[current][i][0];
      const weight = graph[current][i][1];
      if (child !== parent) {
        distanceSumList[child] =
          distanceSumList[current] + weight * (n - 2 * subTreeSizeList[child]);
        dfs2(child, current);
      }
    }
  };
  dfs1(1, 1);
  dfs2(1, 1);

  for (let i = 1; i <= n; i++) {
    console.log(distanceSumList[i]);
  }
}

const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" ").map(Number));
solution(N, arr);
