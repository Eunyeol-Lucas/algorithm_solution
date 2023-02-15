/**
 * 유형: 트리
 * 유니온파인드 활용
 */
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "examples/트리.txt";

let input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

const findParent = (parent, x) => {
  if (parent[x] != x) {
    return findParent(parent, parent[x]);
  }
  return parent[x];
};

const unionParent = (parent, a, b, cycled) => {
  a = findParent(parent, a);
  b = findParent(parent, b);
  // 부모 노드가 이미 동일한 경우 사이클을 형성 -> 트리가 아님
  if (a === b) cycled.push(a);
  if (a < b) parent[b] = a;
  else parent[a] = b;
};

function solution(N, M, graph) {
  let answer = 0;
  // 사이클을 형성한 노드가 포함된 그래프
  const cycled = [];
  const parent = Array.from({ length: N + 1 }, (_, i) => i);
  // 특정 원소가 속한 집단 찾기
  for (const [a, b] of graph) {
    unionParent(parent, a, b, cycled);
  }
  const parentSet = new Set();
  // 각 원소가 속한 집합 
  for (let i = 1; i < N + 1; i++) {
    const x = findParent(parent, i);
    parentSet.add(x);
  }
  // 사이클원소의 집합 찾기
  const newCycled = new Set();
  for (const x of cycled) {
    const k = findParent(parent, x);
    newCycled.add(k);
  }
  // 각 원소의 루트 노드의 개수와 그래프 집합의 수의 차를 구함
  answer = [...parentSet].length - [...newCycled].length;

  return answer;
}

let idx = 0,
  test = 1;

while (true) {
  const [N, M] = input[idx];
  if (N === 0 && M === 0) break;
  const graph = input.slice(idx + 1, idx + 1 + M);
  treeCount = solution(N, M, graph);
  if (treeCount > 1) {
    console.log(`Case ${test}: A forest of ${treeCount} trees.`);
  } else if (treeCount === 1) {
    console.log(`Case ${test}: There is one tree.`);
  } else {
    console.log(`Case ${test}: No trees.`);
  }
  idx += M + 1;
  test++;
}
