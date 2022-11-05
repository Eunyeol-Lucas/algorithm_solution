const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const graph = input.map((i) => i.split(" ").map(Number));
graph.sort((a, b) => {
  if (a[2] > b[2]) return 1;
  else return -1;
});

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

const isUnion = (parent, a, b) => {
  a = findParent(parent, a);
  b = findParent(parent, b);
  if (a === b) return true;
  return false;
};

function solutiuon(N, M, graph) {
  const MST = [];
  const parent = Array.from({ length: N + 1 }, (_, i) => i);
  for (let i = 0; i < M; i++) {
    const [startNode, endNode, cost] = [graph[i][0], graph[i][1], graph[i][2]];
    if (!isUnion(parent, startNode, endNode)) {
      unionParent(parent, startNode, endNode);
      MST.push({ from: startNode, to: endNode, cost });
    }
  }
  console.log(MST)
  MST.pop();
  const answer = MST.reduce((acc, cur) => acc + cur.cost, 0);

  return answer;
}

console.log(solutiuon(N, M, graph));
