function solution(M, K, arr) {
  let answer = 0;
  arr.sort((a, b) => b - a);
  const first = arr[0];
  const second = arr[1];

  while (true) {
    for (let i = 0; i < K; i++) {
      if (M === 0) break;
      answer += first;
      M--;
    }
    if (M === 0) break;
    answer += second;
    M--;
  }

  return answer;
}

const N = 5,
  M = 8,
  K = 3;
const arr = [2, 4, 5, 4, 6];
console.log(solution(M, K, arr));
