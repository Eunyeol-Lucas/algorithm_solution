/**
 * 유형: 이분 탐색(투포인터)
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  let answer = Number.MAX_SAFE_INTEGER;
  let flag = false;
  for (let i = 0; i < n; i++) {
    let left = i + 1;
    let right = n - 1;
    let tmp;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      tmp = arr[i] + arr[mid];
      if (tmp === 0) {
        flag = true;
        answer = 0;
        break;
      }
      if (Math.abs(tmp) < Math.abs(answer)) answer = tmp;
      if (tmp < 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (flag) break;
  }
  return answer;
}

const N = +input[0];
const arr = input[1].split(" ").map(Number);
console.log(solution(N, arr));
