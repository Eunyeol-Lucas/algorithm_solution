function solution(stones, k) {
  let answer = 0;
  let start = 1,
    end = 200000000;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let cnt = 0;
    for (const x of stones) {
      if (cnt >= k) break;
      if (x <= mid) cnt++;
      else cnt = 0;
    }
    if (cnt < k) start = mid + 1;
    else {
      end = mid - 1;
      answer = mid;
    }
  }
  return answer;
}

const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1],
  k = 3;

console.log(solution(stones, k));
