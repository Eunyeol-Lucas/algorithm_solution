/**
 * 유형: 트리, 그래프 탐색
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution(input) {
  const stack = [];
  const result = [];
  stack.push([0, input.length - 1]);
  while (stack.length) {
    const [start, end] = stack.pop();

    if (start > end) continue;

    let pivot;
    for (let i = start + 1; i <= end; i++) {
      if (input[i] < input[start]) continue;
      pivot = i; // 오른쪽 서브트리 인덱스
      break;
    }

    // 오른쪽 서브트리가 존재할 때
    if (pivot) {
      // 왼쪽 서브트리의 시작,끝 인덱스 삽입
      stack.push([start + 1, pivot - 1]);
      // 오른쪽 서브트리의 시작, 끝 인덱스 삽입
      stack.push([pivot, end]);
    } else {
      // 오른쪽 서브트리가 없으며, 루트 제외한 나머지 숫자들 삽입
      stack.push([start + 1, end]);
    }
    result.unshift(input[start]);
  }
  console.log(result.join("\n"));
}

solution(input);
