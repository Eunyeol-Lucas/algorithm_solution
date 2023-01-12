/**
 * 유형: 트라이 (메모리: 736668kb, 속도: 7308ms)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, 1 + N);
const S = input.slice(1 + N);

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
      if (currentNode.child[currentChar] === undefined) {
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
      } else {
        return null;
      }
    }
    return currentNode.end ? currentNode.value : null;
  }
}

function solution(N, M, words, S) {
  let answer = 0;
  const trie = new Trie();
  words.forEach((word) => trie.insert(word));

  for (const x of S) {
    if (trie.search(x)) answer++;
  }

  return answer;
}

console.log(solution(N, M, arr, S));
