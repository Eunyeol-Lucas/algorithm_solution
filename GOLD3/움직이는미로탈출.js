const { start } = require("repl");

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const directList = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [-1, -1],
  [-1, 1],
  [0, 0],
  [1, 0],
  [1, -1],
  [1, 1],
];

function solution(graph) {
  const [targetX, targetY] = [0, 7];
  const [startX, startY] = [7, 0];
  const EMPTY = ".";
  const NEWROW = "........";
  const bt = (x, y, board, top) => {
    if (x === targetX && y === targetY) return 1;

    if (!board[x] || board[x][y] !== EMPTY) return 0;

    if (x === 0) return 1;
    if (x < top) return 1;

    const nextBoard = [NEWROW, ...board.slice(0, -1)];
    for (const [dx, dy] of directList) {
      const [nx, ny] = [x + dx, y + dy];
      if (
        board[nx] &&
        board[nx][ny] === EMPTY &&
        bt(nx, ny, nextBoard, top + 1)
      )
        return 1;
    }
    return 0;
  };
  return bt(startX, startY, graph, 0);
}

console.log(solution(input));
