const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, s, arr) {
  let answer = 0;

  // 부분수열을 만들기 위해 비트마스크를 사용 n이 5이므로 총 31가지 경우의 수가 생김
  for (let i = 1; i < 1 << n; i++) {
    let tmp = 0;
    // 해당 부분 수열 집합에 포함된 숫자들만 tmp 변수에 축척
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        tmp += arr[j];
      }
    }
    // S와 tmp값이 같을 경우 answer의 값 증가
    if (tmp === s) answer++;
  }
  return answer;
}

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
console.log(solution(N, S, arr));
