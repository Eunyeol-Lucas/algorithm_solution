function solution(N, M, board) {
  let max = 0;
  const zeroPosition = [];
  const virus = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!board[i][j]) zeroPosition.push([i, j]);
      else if (board[i][j] === 2) virus.push([i, j]);
    }
  }
  const combinations = getCombinations(zeroPosition, 3);
  for (const element of combinations) {
    const copyBoard = board.map((el) => [...el]);
    for (const position of element) copyBoard[position[0]][position[1]] = 1;

    bfs(copyBoard, virus);
    const zeroCnt = copyBoard.reduce(
      (acc, curr) => acc + curr.filter((el) => !el).length,
      0
    );
    if (zeroCnt > max) max = zeroCnt;
  }
  console.log(max);
}

const directList = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function bfs(copiedGraph, virus) {
  const virusPositionList = [...virus];
  while (virusPositionList.length) {
    const [x, y] = virusPositionList.shift();
    for (const [dx, dy] of directList) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < N && ny >= 0 && ny < M && !copiedGraph[nx][ny]) {
        copiedGraph[nx][ny] = 2;
        virusPositionList.push([nx, ny]);
      }
    }
  }
}

function getCombinations(arr, n) {
  const results = [];
  if (n === 1) return arr.map((el) => [el]);

  arr.forEach((curr, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, n - 1);
    const attached = combinations.map((el) => [curr, ...el]);
    results.push(...attached);
  });
  return results;
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ");

const graph = input.map((i) => i.split(" ").map(Number));
solution(N, M, graph);

console.log(solution1(N, M, graph));

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
