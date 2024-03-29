/**
 * 유형: 이분탐색, 투포인터
 * solution 성능: 11820kb	1660ms
 * solution2 성능: 11656kb, 244ms
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

function solution2(n, arr) {
  let answer = [];
  let min = Number.MAX_SAFE_INTEGER;
  arr.sort((a, b) => a - b);
  for (let i = 0; i < n - 2; i++) {
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];
      if (Math.abs(sum) < Math.abs(min)) {
        min = sum;
        answer = [arr[i], arr[left], arr[right]];
      }
      if (sum < 0) left++;
      else right--;
    }
  }
  return answer.join(" ");
}

const N = +input[0];
const arr = input[1].split(" ").map(Number);

console.log(solution(N, arr));
console.log(solution2(N, arr));
