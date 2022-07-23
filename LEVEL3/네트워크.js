function solution(n, computers) {
  var answer = 0;
  const graph = Array.from({ length: n }, () => []);
  const vst = Array(n).fill(0);
  for (let i = 0; i < computers.length; i++) {
    for (let j = 0; j < computers[i].length; j++) {
      if (i === j) {
        graph[i].push(j);
      }
      if (computers[i][j] === 1 && !graph[i].includes(j)) {
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }
  for (const x of graph) {
    for (const y of x) {
      if (!vst[y]) {
        const q = [];
        q.push(y);
        vst[y] = 1;
        answer++;
        while (q.length) {
          const y = q.shift();
          for (const k of graph[y]) {
            if (!vst[k]) {
              vst[k] = 1;
              q.push(k);
            }
          }
        }
      }
    }
  }
  return answer;
}

const n = 4,
  computers = [
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

console.log(solution(n, computers));
