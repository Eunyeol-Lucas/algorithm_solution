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

  insert(value) {
    let currentNode = this.root;

    for (let i = 0; i < value.length; i++) {
      const currentChar = value[i];
      if (!currentNode.child[currentChar]) {
        currentNode.child[currentChar] = new Node(
          currentNode.value + currentChar
        );
      }
      currentNode = currentNode.child[currentChar];
    }
    currentNode.end = true;
  }

  search(value) {
    let currentNode = this.root;
    for (let i = 0; i < value.length; i++) {
      const currentChar = value[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
      } else return false;
    }
    return currentNode.end;
  }
}

const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
const scoreDict = [0, 0, 0, 1, 1, 2, 3, 5, 11];

const W = +input[0];
const dictionary = input.slice(1, W + 1);
const trie = new Trie();
for (const word of dictionary) {
  trie.insert(word);
}

function solution(board) {
  const checked = Array.from({ length: 4 }, () => Array(4).fill(0));

  let total = 0;
  let score = 0;
  let maxWord = "";
  const set = new Set();

  const dfs = (x, y, word, count, node) => {
    if (trie.search(word) && !set.has(word)) {
      score += scoreDict[count];
      total += 1;
      set.add(word);
      if (count > maxWord.length) maxWord = word;
      else if (count === maxWord.length && word < maxWord) maxWord = word;
    }

    if (count === 8) return;

    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || nx > 3 || ny < 0 || ny > 3 || checked[nx][ny]) continue;
      checked[nx][ny] = 1;
      if (board[nx][ny] in node.child) {
        dfs(nx, ny, word + board[nx][ny], count + 1, node.child[board[nx][ny]]);
      }
      checked[nx][ny] = 0;
    }
  };
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] in trie.root.child) {
        checked[i][j] = 1;
        dfs(i, j, board[i][j], 1, trie.root.child[board[i][j]]);
        checked[i][j] = 0;
      }
    }
  }
  return [score, maxWord, total].join(" ");
}

const B = +input[W + 2];
let idx = W + 3;
let answer = "";
for (let i = 0; i < B; i++) {
  const board = input.slice(idx, idx + 4);
  answer += solution(board) + "\n";
  idx += 5;
}

console.log(answer);
