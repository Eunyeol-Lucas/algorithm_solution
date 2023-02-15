const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Node {
  constructor(value = "") {
    this.value = value;
    this.end = false;
    this.cnt = 0;
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
    currentNode.cnt++;
  }
  search(value) {
    let currentNode = this.root;
    let answer = "";
    for (let i = 0; i < value.length; i++) {
      const currentChar = value[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar];
        answer += currentChar;
      } else {
        return answer + currentChar;
      }
    }
    if (currentNode.end) {
      return answer + (currentNode.cnt + 1);
    } else return answer;
  }
}

function solution(nicknames) {
  const trie = new Trie();
  for (const nickname of nicknames) {
    const answer = trie.search(nickname);
    trie.insert(nickname);
    console.log(answer);
  }
}

solution(input.slice(1));
