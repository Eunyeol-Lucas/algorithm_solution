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
    const words = value.split(" ");
    let currentNode = this.root;
    for (let i = 1; i < words.length; i++) {
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
  const DFS = (node, step) => {
    const keyArr = Object.keys(node.child).sort();
    for (const key of keyArr) {
      console.log(`${"--".repeat(step)}${key}`);
      DFS(node.child[key], step + 1);
    }
  };
  DFS(trie.root, 0);
}

solution(input.slice(1));
