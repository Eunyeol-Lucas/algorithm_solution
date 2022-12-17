const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let T = +input[0];

const getCombination = (arr, n) => {
  if (n === 1) return arr.map((elem) => [elem]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combins = getCombination(rest, n - 1);
    const attached = combins.map((combi) => [fixed, ...combi]);
    result.push(...attached);
  });

  return result;
};

function colSum(mat) {
  let [x, y] = [0, 0];
  for (const [x1, y1] of mat) {
    x += x1;
    y += y1;
  }
  return [x, y];
}

function solution(N, arr) {
  let answer = Number.MAX_SAFE_INTEGER;
  const s = colSum(arr);

  comb = getCombination(arr, Math.floor(N / 2));

  for (const c of comb) {
    const cur = colSum(c);
    answer = Math.min(
      answer,
      Math.sqrt((2 * cur[0] - s[0]) ** 2 + (2 * cur[1] - s[1]) ** 2)
    );
  }
  return answer;
}
let idx = 1;
for (let i = 0; i < T; i++) {
  const N = +input[idx];
  const arr = input
    .slice(idx + 1, idx + 1 + N)
    .map((i) => i.split(" ").map(Number));
  idx += N + 1;
  console.log(solution(N, arr));
}
