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
    return currentNode.end && currentNode.value;
  }
}

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enQueue(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  deQueue() {
    const tmp = this.storage[this.front];
    if (!tmp) return null;
    delete this.storage[this.front];
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front++;
    }
    this.size--;
    return tmp;
  }
}

function solution(w, dictionary, b, board) {
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

  for (let i = 0; i < 1; i++) {
    for (let a = 0; a < 4; a++) {
      for (let b = 0; b < 4; b++) {
        const vst = Array.from({ length: 4 }, () => new Array(4).fill(0));
        vst[a][b] = 1;
        const q = new Queue();
        q.enQueue([board[i][a][b], a, b]);
        while (q.size) {
          let [tmp, x, y] = q.deQueue();
          let score = trie.search(tmp);
          console.log(score, tmp);
          if (tmp.length > 8) continue;
          for (const [dx, dy] of directions) {
            const [nx, ny] = [x + dx, y + dy];
            if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) continue;
            q.enQueue([tmp + board[i][nx][ny], nx, ny]);
          }
        }
      }
    }
  }
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
