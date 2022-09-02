const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const newInput = input.map((i) => i.split(" ").map(Number));
console.log(solution2(N, M, newInput));

function solution2(N, M, graph) {
  let max = 0;
  const zeroPosition = [];
  const virusPosition = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!graph[i][j]) zeroPosition.push([i, j]);
      else if (graph[i][j] === 2) virusPosition.push([i, j]);
    }
  }

  const combintaionList = getCombinations(zeroPosition, 3);
  for (const element of combintaionList) {
    const copiedGraph = graph.map((el) => [...el]);
    for (const position of element) copiedGraph[position[0]][position[1]] = 1;
    bfs(copiedGraph, virusPosition);
    const zeroCnt = copiedGraph.reduce(
      (acc, cur) => acc + cur.filter((el) => !el).length,
      0
    );
    if (zeroCnt > max) max = zeroCnt;
  }
  return max;
}

function bfs(graph, virus) {
  let virusList = [...virus];

  while (virusList.length > 0) {
    const [x, y] = virusList.shift();
    if (x > 0 && graph[x - 1][y] === 0) {
      graph[x - 1][y] = 2;
      virusList.push([x - 1, y]);
    }
    if (x < N - 1 && graph[x + 1][y] === 0) {
      graph[x + 1][y] = 2;
      virusList.push([x + 1, y]);
    }
    if (y > 0 && graph[x][y - 1] === 0) {
      graph[x][y - 1] = 2;
      virusList.push([x, y - 1]);
    }
    if (y < M - 1 && graph[x][y + 1] === 0) {
      graph[x][y + 1] = 2;
      virusList.push([x, y + 1]);
    }
  }
}

function getCombinations(arr, n) {
  const resultList = [];
  if (n === 1) return arr.map((i) => [i]);

  arr.forEach((cur, index, origin) => {
    const rest = origin.slice(index + 1);
    const combintaions = getCombinations(rest, n - 1);
    const attached = combintaions.map((el) => [cur, ...el]);
    resultList.push(...attached);
  });
  return resultList;
}

console.log(solution1(N, M, newInput));

function bfs1(answer) {
  const tmp = newInput.map((i) => [...i]);
  const diresctList = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const q = [];
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (tmp[i][j] === 2) {
        q.push([i, j]);
      }
    }
  }

  while (q.length) {
    const [x, y] = q.shift();

    for (const [dx, dy] of diresctList) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (tmp[nx][ny] === 0) {
          tmp[nx][ny] = 2;
          q.push([nx, ny]);
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    cnt += tmp[i].filter((o) => o === 0).length;
  }
  return Math.max(answer, cnt);
}

function solution1(N, M, graph) {
  let answer = 0;
  function dfs(cnt) {
    if (cnt === 3) {
      answer = bfs1(answer);
      return;
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (graph[i][j] == 0) {
          graph[i][j] = 1;
          dfs(cnt + 1);
          graph[i][j] = 0;
        }
      }
    }
  }
  dfs(0);
  return answer;
}
