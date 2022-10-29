const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solution(game_board, table) {
  let answer = 0;
  const N = table.length;

  const blankList = [],
    blockList = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (game_board[i][j] === 0) {
        game_board[i][j] = -1;
        blankList.push(bfs([[i, j]], game_board, 0));
      }

      if (table[i][j] === 1) {
        table[i][j] = -1;
        blockList.push(bfs([[i, j]], table, 1));
      }
    }
  }

  blockList.forEach((v) => {
    for (let i = 0; i < blankList.length; i++) {
      let match = false;
      for (let j = 0; j < 4; j++) {
        v = rotate(v);
        if (JSON.stringify(v) === JSON.stringify(blankList[i])) {
          blankList.splice(i, 1);
          answer += v.length;
          match = true;
          break;
        }
      }
      if (match) break;
    }
  });

  return answer;
}

function bfs(list, board, target) {
  const result = [...list];
  const N = board.length;
  while (list.length > 0) {
    const [x, y] = list.shift();
    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx >= N) continue;
      if (ny < 0 || ny >= N) continue;

      if (board[nx][ny] === target) {
        board[nx][ny] = -1;
        result.push([nx, ny]);
        list.push([nx, ny]);
      }
    }
  }
  return rearrange(result);
}

function rearrange(list) {
  const minY = Math.min(...list.map((v) => v[0]));
  const minX = Math.min(...list.map((v) => v[1]));

  return list.map((v) => [v[0] - minY, v[1] - minX]).sort();
}

function rotate(list) {
  const max = Math.max(...list.map((v) => Math.max(v[0], v[1])));
  const rotatedBlock = list.map((v) => [max - v[1], v[0]]);

  return rearrange(rotatedBlock);
}

// const game_board = [
//   [1, 1, 0, 0, 1, 0],
//   [0, 0, 1, 0, 1, 0],
//   [0, 1, 1, 0, 0, 1],
//   [1, 1, 0, 1, 1, 1],
//   [1, 0, 0, 0, 1, 0],
//   [0, 1, 1, 1, 0, 0],
// ];
// const table = [
//   [1, 0, 0, 1, 1, 0],
//   [1, 0, 1, 0, 1, 0],
//   [0, 1, 1, 0, 1, 1],
//   [0, 0, 1, 0, 0, 0],
//   [1, 1, 0, 1, 1, 0],
//   [0, 1, 0, 0, 0, 0],
// ];

const game_board = [
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0],
  [1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
];

const table = [
  [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1],
];

console.log(solution(game_board, table));
