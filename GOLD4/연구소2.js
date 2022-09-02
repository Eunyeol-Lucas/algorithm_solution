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
