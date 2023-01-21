/**
 * 유형: 정렬
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(m, n, universes) {
  let answer = 0;
  const idxs = [];
  for (const universe of universes) {
    let a = []
    const sortable = universe
      .map((v, idx) => [idx, v])
      .sort(([, a], [, b]) => a - b)
    a.push(sortable[0][0]);
    for (let i = 1; i < n; i++) {
      if (sortable[i][1] === sortable[i - 1][1]) {
        a.push(sortable[i - 1][0]);
      } else a.push(sortable[i][0]);
    }
    idxs.push(JSON.stringify(a))
  }

  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (idxs[i] === idxs[j]) {
        answer++;
      }
    }
  }
  return answer;
}

const [M, N] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((i) => i.split(" ").map(Number));
console.log(solution(M, N, arr));
