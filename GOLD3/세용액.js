/**
 * 유형: 이분탐색
 * solution 성능: 11820kb	1660ms
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, arr) {
  let min = Number.MAX_SAFE_INTEGER;
  let answer = [];
  arr.sort((a, b) => a - b);
  let flag = false;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let left = i;
      let right = n - 1;
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let tmp = arr[i] + arr[j] + arr[mid];
        if (Math.abs(tmp) === 0 && i !== j && j !== mid && i !== mid) {
          min = tmp;
          answer = [arr[i], arr[j], arr[mid]];
          flag = true;
          break;
        }

        if (
          Math.abs(tmp) < Math.abs(min) &&
          i !== j &&
          j !== mid &&
          i !== mid
        ) {
          min = tmp;
          answer = [arr[i], arr[j], arr[mid]];
        }
        if (tmp < 0) left = mid + 1;
        else right = mid - 1;
      }
      if (flag) break;
    }
    if (flag) break;
  }
  return answer.sort((a, b) => a - b).join(" ");
}

const N = +input[0];
const arr = input[1].split(" ").map(Number);

console.log(solution(N, arr));
