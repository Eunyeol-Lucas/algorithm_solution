let input = require("fs").readFileSync("예제.txt").toString().split("\n");
const [N, M] = input
  .shift()
  .split(" ")
  .map((i) => +i);
const graph = Array.from({ length: 101 }, (_, i) => i);
for (let i = 0; i < N + M; i++) {
  let [a, b] = input
    .shift()
    .split(" ")
    .map((i) => +i);
  graph[a] = b;
}

const q = [];
q.push(1);
const vst = Array(101).fill(-1);
vst[1] = 0;

while (q.length) {
  const x = q.shift();
  for (let i = 1; i < 7; i++) {
    const nx = x + i;
    if (nx > 100) continue;
    const v = graph[nx];
    if (vst[v] === -1) {
      q.push(v);
      vst[v] = vst[x] + 1;
      if (v === 100) break;
    }
  }
}

console.log(vst[100]);
