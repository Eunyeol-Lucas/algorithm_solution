function solution(brown, yellow) {
  var answer = [];
  let sum = brown + yellow;
  for (let height = 3; height <= brown; height++) {
    if (sum % height === 0) {
      let width = sum / height;

      if ((height - 2) * (width - 2) === yellow) {
        return [width, height];
      }
    }
  }
  return answer;
}

console.log(solution(10, 2));
