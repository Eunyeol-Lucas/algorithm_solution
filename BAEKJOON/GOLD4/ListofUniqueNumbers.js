/**
 * 유형: 투포인터
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [N, arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, nums) {
  let answer = 0;
  let left = 0;
  let right = 0;
  const ch = Array.from({ length: n + 1 }, () => false);
  while (left !== n && right !== n) {
    if (!ch[nums[right]]) {
      ch[nums[right]] = true;
      right++;
      answer += right - left;
    } else {
      while (ch[nums[right]]) {
        ch[nums[left]] = false;
        left++;
      }
    }
  }

  return answer;
}

const nums = arr.split(" ").map(Number);
console.log(solution(+N, nums));
