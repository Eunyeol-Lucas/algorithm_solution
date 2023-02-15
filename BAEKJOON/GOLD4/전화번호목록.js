/**
 * 유형: 정렬, 트라이
 * 풀이: 전화번호 문자열을 오름차순으로 정렬
 * 한 번호가 다음 번호의 접두어인 경우가 존재하는지 확인
 * 정렬 - 메모리: 33988kb, 시간: 496ms
 * 트라이 - 메모리: 130844kb, 시간: 1344ms
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input[0];


function solution(arr) {
  let answer = "YES",
    previousNumberLength = 0;
  arr.sort((a, b) => a.localeCompare(b));
  // 번호 A가 다른 번호의 접두어인 경우가 존재하면, 번호 A 바로 뒤에 A를 접두어로 가지는 번호가 오는 경우가 항상 존재
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith(arr[i - 1])) {
      answer = "NO";
      break;
    }
    previousNumberLength = arr[i].length;
  }

  return answer;
}

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
      } else return null;
    }
    return currentNode.value;
  }
}

function solution2(arr) {
  let answer = "YES";
  const trie = new Trie();
  arr.sort((a, b) => b - a);
  for (let i = 1; i < arr.length; i++) {
    trie.insert(arr[i - 1]);
    if (!arr[i - 1]) continue;
    if (trie.search(arr[i])) {
      answer = "NO";
      break;
    }
  }

  return answer;
}

let idx = 1;
for (let i = 0; i < T; i++) {
  const N = +input[idx];
  const arr = input.slice(idx + 1, idx + 1 + N);
  console.log(solution2(arr));
  idx += N + 1;
}
