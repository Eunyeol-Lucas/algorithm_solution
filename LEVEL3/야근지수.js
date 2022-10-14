function solution(n, works) {
  let answer = 0;
  const worksLen = works.length;
  if (worksLen > 20000 || worksLen < 1 || n > 1000000) return answer;

  let sum = works.reduce((acc, cur) => acc + cur, 0);
  if (sum <= n) return 0;
  let max = -1;
  let idx = -1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < worksLen; j++) {
      if (max < works[j]) {
        max = works[j];
        idx = j;
      }
    }
    max = --works[idx];
  }

  for (let j = 0; j < worksLen; j++) {
    answer += works[j] * works[j];
  }
  return answer;
}

const works = [4, 3, 3],
  n = 4;

console.log(solution(n, works));
