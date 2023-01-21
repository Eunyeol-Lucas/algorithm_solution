/**
 * 유형: 정렬, 이분 탐색
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
    let a = [];
    const sortable = universe
      .map((v, idx) => [idx, v])
      .sort(([, a], [, b]) => a - b);
    a.push(sortable[0][0]);
    for (let i = 1; i < n; i++) {
      if (sortable[i][1] === sortable[i - 1][1]) {
        a.push(sortable[i - 1][0]);
      } else a.push(sortable[i][0]);
    }
    idxs.push(JSON.stringify(a));
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


function solution2(m, n, universes) {
  let metaVerses = [],
    cnt = 0;
  for (const univ of universes) {
    const planets = univ.split(" ").map(Number);
    const newUniv = [];
    const sortedPlanets = [...planets].sort((a, b) => a - b);

    for (let i = 0; i < n; i++) {
      let planet = planets[i];
      let left = 0,
        right = m - 1,
        idx;
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (sortedPlanets[mid] < planet) {
          left = mid + 1;
        } else {
          idx = mid;
          right = mid - 1;
        }
      }
      newUniv.push(idx);
    }
    metaVerses.push(newUniv.join(""));
  }
  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      if (metaVerses[i] === metaVerses[j]) cnt++;
    }
  }
  return cnt;
}

const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [a, ...universes] = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n");
const [A, B] = a.split(" ").map(Number);

console.log(solution2(A, B, universes));
