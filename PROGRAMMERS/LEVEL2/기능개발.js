function solution(progresses, speeds) {
  var answer = [];
  const stk = [];
  for (let i = 0; i < progresses.length; i++) {
    const tmp = Math.ceil((100 - progresses[i]) / speeds[i]);
    stk.push(tmp);
  }
  let prev = stk[0],
    cnt = 1;
  for (let i = 1; i < stk.length; i++) {
    if (stk[i] <= prev) cnt++;
    else {
      prev = stk[i];
      answer.push(cnt);
      cnt = 1;
    }
    if (i === stk.length - 1) {
      answer.push(cnt);
    }
  }
  return answer;
}

let progresses = [93, 30, 55],
  speeds = [1, 30, 5];
console.log(solution(progresses, speeds));
