/**
 * 유형: 구간 합
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, H] = input[0].split(" ").map(Number);
const arr = input.slice(1);
function solution(n, h, arr) {
  let result = [];
  const top = Array.from({ length: H }, () => 0);
  const btm = Array.from({ length: H }, () => 0);
  for (let i = 0; i < N; i++) {
    if (i % 2 === 0) btm[+arr[i] - 1]++;
    else top[+arr[i] - 1]++;
  }
  for (let i = h - 2; i > -1; i--) {
    btm[i] += btm[i + 1];
    top[i] += top[i + 1];
  }
  const down = btm.reverse();
  for (let i = 0; i < down.length; i++) {
    result.push(down[i] + top[i]);
  }
  const min = Math.min(...result);

  const cnt = result.filter((i) => i === min).length;
  return [min, cnt].join(" ");
}

console.log(solution(N, H, arr));
