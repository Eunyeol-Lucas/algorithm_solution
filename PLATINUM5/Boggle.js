const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(value = "") {
    this.value = value;
    this.end = false;
    this.child = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(string) {
    let currentNode = this.root;
    for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];

      if (currentNode.child[currentChar] === undefined) {
        currentNode.child[currentChar] = new Node(
          currentNode.value + currentChar
        );
      }

      currentNode = currentNode.child[currentChar];
    }
    currentNode.end = true;
  }

  search(string) {
    let currentNode = this.root;

    for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
      } else {
        return false;
      }
    }
    return currentNode.end;
  }
}

function solution(w, dictionary, b, board) {
  let answer = "";
  const trie = new Trie();
  for (const word of dictionary) {
    trie.insert(word);
  }
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const vst = Array.from({ length: 4 }, () => new Array(4).fill(0));

  for (let i = 0; i < b; i++) {
    const set = new Set();
    for (let a = 0; a < 4; a++) {
      for (let b = 0; b < 4; b++) {
        vst[a][b] = 1;
        const target = [""];
        dfs(a, b, board[i][a][b], 1, set, board[i], target);
        vst[a][b] = 0;
        if (target[0]) set.add(target[0]);
      }
    }
    console.log(set)
    let score = 0;
    let word = "";
    const arr = [...set];
    arr.sort();
    for (const x of arr) {
      const len = x.length;
      word = word.length < len ? x : word;
      if (len === 1 || len === 2) score += 0;
      else if (len === 3 || len === 4) score += 1;
      else if (len === 5) score += 2;
      else if (len === 6) score += 3;
      else if (len === 7) score += 5;
      else if (len === 8) score += 11;
    }

    answer += score
      ? `${score} ${word} ${arr.length}\n`
      : `${score} ${arr.length}\n`;
  }

  function dfs(x, y, word, cnt, set, board, target) {
    if (cnt > 8) return;

    if (trie.search(word))
      target[0] = target[0].length < word.length ? word : target[0];

    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4 || vst[nx][ny]) continue;
      vst[nx][ny] = 1;
      dfs(nx, ny, word + board[nx][ny], cnt + 1, set, board, target);
      vst[nx][ny] = 0;
    }
  }
  return answer;
}

const W = +input[0];
const dictionary = input.slice(1, W + 1);

const B = +input[W + 2];
let idx = W + 3;
const board = [];
for (let i = 0; i < B; i++) {
  const tmp = input.slice(idx, idx + 4);
  idx += 5;
  board.push(tmp);
}

console.log(solution(W, dictionary, B, board));
