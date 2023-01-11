/**
 * 유형: 정렬
 * 풀이: 전화번호 문자열을 오름차순으로 정렬
 * 한 번호다 다음 번호의 접두어인 경우가 존재하는지 확인
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input[0];

function solution(arr) {
  let answer = "YES",
    previousNumberLength = 0;
  arr.sort((a, b) => a.localeCompare(b));
  // 번호 A가 다른 번호의 접두어인 경우가 존재하면, 번호 A 바로 뒤에 A를 접두어로 가지는 번호가 오는 경우가 항상 존재
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].slice(0, previousNumberLength) === arr[i - 1]) {
      answer = "NO";
      break;
    }
    previousNumberLength = arr[i].length;
  }

  return answer;
}

let idx = 1;
for (let i = 0; i < T; i++) {
  const N = +input[idx];
  const arr = input.slice(idx + 1, idx + 1 + N);
  console.log(solution(arr));
  idx += N + 1;
}
