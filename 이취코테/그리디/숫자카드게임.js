function solution(N, M, arr) {
  let answer = 0;
  for (const x of arr) {
    minValue = Math.min(...x);
    answer = Math.max(minValue, answer);
  }
  return answer;
}

// const M = 3,
//   N = 3;
// const arr = [
//   [3, 1, 2],
//   [4, 1, 4],
//   [2, 2, 2],
// ];
const M = 2,
  N = 4;
const arr = [
  [7, 3, 1, 8],
  [3, 3, 3, 4],
];

console.log(solution(N, M, arr));
