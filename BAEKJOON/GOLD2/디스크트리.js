/**
 * 유형: 트라이
 * 메모리: 22732kb	시간: 1856ms
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(value) {
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
    const words = value.split("\\");
    for (let i = 0; i < words.length; i++) {
      const currentChar = words[i];
      if (currentNode.child[currentChar] === undefined) {
        currentNode.child[currentChar] = new Node(currentChar);
      }
      currentNode = currentNode.child[currentChar];
    }
    currentNode.end = true;
  }
}

function solution(arr) {
  const trie = new Trie();
  for (const x of arr) {
    trie.insert(x);
  }
  const DFS = (currentNode, step) => {
    const newObj = Object.keys(currentNode.child).sort();
    for (const key of newObj) {
      console.log(`${" ".repeat(step)}${key}`);
      DFS(currentNode.child[key], step + 1);
    }
  };
  DFS(trie.root, 0);
}

solution(input.slice(1).sort());
