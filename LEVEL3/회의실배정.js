function solution(arr) {
  var answer = 0;

  const times = arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });

  let et = 0;
  times.forEach((time) => {
    if (time[0] >= et) {
      answer++;
      et = time[1];
    }
  });
  return answer;
}

const arr = [
  [1, 2],
  [2, 4],
  [2, 2],
];

console.log(solution(arr));
