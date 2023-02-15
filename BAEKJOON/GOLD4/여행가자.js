const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const M = +input.shift();
const plan = input.pop().split(" ").map(Number);
const cities = input.map((arr) => arr.split(" ").map(Number));

function findParent(parent, x) {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x]);
  }
  return parent[x];
}

function unionParent(parent, a, b) {
  a = findParent(parent, a);
  b = findParent(parent, b);
  if (a < b) {
    parent[b] = a;
  } else parent[a] = b;
}

function solution(N, M, plan, cities) {
  const parent = Array.from({ length: N + 1 }, (_, i) => i);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (cities[i][j] === 1) {
        unionParent(parent, i + 1, j + 1);
      }
    }
  }
  let p = parent[plan[0]];
  return plan.every((i) => parent[i] === p) ? "YES" : "NO";
}

console.log(solution(N, M, plan, cities));