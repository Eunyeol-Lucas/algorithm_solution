/**
 * 유형: 이분 탐색
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(targets, keywords) {
  targets.sort((a, b) => a - b);
  let result = "";
  for (const keyword of keywords) {
    let left = 0,
      right = targets.length - 1;
    let answer = 0;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (targets[mid] === keyword) {
        answer = 1;
        break;
      } else if (targets[mid] < keyword) {
        left = mid + 1;
      } else right = mid - 1;
    }
    result += answer + '\n';
  }
  // console.log는 출력시간이 길기 때문에 아래와 같이 하나의 변수에 담아 한 번에 출력하는 것이 더 좋다.
  console.log(result);
}

const targets = input[1].split(" ").map(Number);
const keywords = input[3].split(" ").map(Number);

solution(targets, keywords);
