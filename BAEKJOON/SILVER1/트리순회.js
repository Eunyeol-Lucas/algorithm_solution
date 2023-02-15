const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution(n, arr) {
  let answer = "";
  const tree = {};
  for (const [A, B, C] of arr) {
    tree[A] = [B, C];
  }
  const preOrder = (v) => {
    if (v !== ".") {
      answer += v;
      preOrder(tree[v][0]);
      preOrder(tree[v][1]);
    }
  };

  const inOrder = (v) => {
    if (v !== ".") {
      inOrder(tree[v][0]);
      answer += v;
      inOrder(tree[v][1]);
    }
  };

  const postOrder = (v) => {
    if (v !== ".") {
      postOrder(tree[v][0]);
      postOrder(tree[v][1]);
      answer += v;
    }
  };

  preOrder("A");
  answer += "\n";
  inOrder("A");
  answer += "\n";
  postOrder("A");
  return answer;
}

const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" "));
console.log(solution(N, arr));
