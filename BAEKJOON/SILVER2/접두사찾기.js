/**
 * 유형: 트라이, 정렬
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const words = input.slice(1, N + 1);
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
    return currentNode.value;
  }
}

function solution(words, S) {
  let answer = 0;
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }
  for (const key of S) {
    if (trie.search(key)) answer++;
  }

  return answer;
}

console.log(solution(words, S));

function solution2(input) {
  let answer = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i].indexOf(input[i - 1]) === 0) answer++;
  }

  return answer;
}

console.log(solution2(input.slice(1).sort()));
