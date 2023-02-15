function solution(n, stations, w) {
  let answer = 0;
  let index = 1;
  const range = 2 * w + 1;
  stations.forEach((x) => {
    if (x - w > index) {
      answer += Math.ceil((x - w - index) / range);
    }
    index = x + w + 1;
  });
  return answer + Math.ceil((n - index + 1) / range);
}

const n = 16,
  stations = [9],
  w = 2;

console.log(solution(n, stations, w));
