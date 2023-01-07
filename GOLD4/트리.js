const filePath =
  process.platform === "linux" ? "/dev/stdin" : "examples/트리.txt";

let input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => i.split(" ").map(Number));

// function findTree(i, vst, tree) {
//   let flag = true;
//   let q = [i];
//   while (q.length) {
//     const now = q.shift();
//     if (vst[now]) flag = false;
//     vst[now] = true;
//     for (const next of tree[now]) {
//       if (!vst[next]) q.push(next);
//     }
//   }

//   return flag;
// }

// function solution(N, M, graph) {
//   let answer = 0;
//   const tree = Array.from({ length: N + 1 }, () => new Array());
//   const vst = Array.from({ length: N + 1 }, () => false);

//   for (const [a, b] of graph) {
//     if (a === b) continue;
//     tree[a].push(b);
//     tree[b].push(a);
//   }
//   for (let i = 1; i <= N; i++) {
//     if (vst[i]) continue;
//     if (findTree(i, vst, tree)) answer++;
//   }

//   return answer;
// }

const findParent = (parent, x) => {
  if (parent[x] != x) {
    return findParent(parent, parent[x]);
  }
  return parent[x];
};

const unionParent = (parent, a, b) => {
  a = findParent(parent, a);
  b = findParent(parent, b);
  if (a === b) return;
  if (a < b) parent[b] = a;
  else parent[a] = b;
};

function solution(N, M, graph) {
  let answer = 0;
  const parent = Array.from({ length: N + 1 }, (_, i) => i);

  for (const [a, b] of graph) {
    unionParent(parent, a, b);
  }
  console.log(parent);
  return answer;
}

let idx = 0,
  test = 1;

while (true) {
  const [N, M] = input[idx];
  if (N === 0 && M === 0) break;
  const graph = input.slice(idx + 1, idx + 1 + M);
  treeCount = solution(N, M, graph);
  if (treeCount > 1)
    console.log(`Case ${test}: A forest of ${treeCount} trees.`);
  else if (treeCount === 1) console.log(`Case ${test}: There is one tree.`);
  else console.log(`Case ${test}: No trees.`);
  idx += M + 1;
  test++;
}
