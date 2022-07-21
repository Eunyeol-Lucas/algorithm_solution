function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, (_) => []);
  const vst = new Array(n + 1).fill(0);
  for (const e of edge) {
    graph[e[0]].push(e[1]);
    graph[e[1]].push(e[0]);
  }
  let q = [1];
  vst[1] = 1;

  while (q.length) {
    const current = q.shift();
    for (const next of graph[current]) {
      if (!vst[next]) {
        vst[next] = vst[current] + 1;
        q.push(next);
      }
    }
  }
  const cnt = Math.max(...vst);

  return vst.filter((v) => v === cnt).length;
}

let n = 6,
  vertex = [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ];
console.log(solution(n, vertex));
