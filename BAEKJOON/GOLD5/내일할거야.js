/**
 * Greedy
 * 과제를 마무리해야하는 시간 기준으로 내림차순 정렬
 * 과제를 탐색하며 과제 마무리할 수 있는 시간을 설정
 * Math.min(현재 탐색 중인 과제의 마감일, 현재까지 지정된 여유기간) - 현재 탐색 중인 과제 소요시간
 * 모든 탐색 후, 과제를 마무리할 수 있는 최대한 늦은 시간 출력
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const list = input.splice(1).map((i) => i.split(" ").map(Number));

function solution(N, list) {
  let answer = Number.MAX_SAFE_INTEGER;
  list.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < N; i++) {
    answer = Math.min(list[i][1], answer) - list[i][0];
  }
  return answer;
}

console.log(solution(N, list));
