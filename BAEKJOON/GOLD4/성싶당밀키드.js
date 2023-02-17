/**
 * 유형: 이분탐색, 그리디
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, g, k, foods) {
  let answer = 0;
  const info = { 0: [], 1: [] };
  // 0과 1 중요도에 따라서 각각 다른 배열로 저장
  for (let i = 0; i < n; i++) {
    const [s, l, o] = foods[i];
    info[o].push([s, l]);
  }

  // 해당 날짜와 K개의 재료를 뺀 최소 세균 수
  const getGermCount = (mid) => {
    let result = 0;
    // 0인 재료는 무조건 포함
    for (const [speed, limit] of info[0]) {
      result += speed * Math.max(1, mid - limit);
    }
    // 세균수로 정렬해서 세균 수가 가장 큰 재료 K개를 뺀 나머지를 포함
    info[1].sort((a, b) => {
      const gA = a[0] * Math.max(1, mid - a[1]);
      const gB = b[0] * Math.max(1, mid - b[1]);
      return gB - gA;
    });
    for (let i = k; i < info[1].length; i++) {
      const [speed, limit] = info[1][i];
      result += speed * Math.max(1, mid - limit);
    }
    return result;
  };

  let left = 0,
    right = 2e9;

  while (left <= right) {
    const mid = ((left + right) / 2) >> 0;
    const germs = getGermCount(mid);
    if (germs <= g) {
      answer = mid;
      left = mid + 1;
    } else right = mid - 1;
  }
  return answer;
}

const [N, G, K] = input[0].split(" ").map(Number);
const foodInformation = input.slice(1).map((i) => i.split(" ").map(Number));

console.log(solution(N, G, K, foodInformation));
