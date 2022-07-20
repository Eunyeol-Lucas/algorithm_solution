function solution(s) {
  var answer = -1;
  if (s.length % 2 !== 0) return 0;
  const stk = [];
  for (let i = 0; i < s.length; i++) {
    let t = s[i];
    if (stk.length && stk[stk.length - 1] === t) {
      stk.pop();
    } else {
      stk.push(t);
    }
  }
  answer = stk.length ? 0 : 1;
  return answer;
}

const s = "cdcd	";
console.log(solution(s));
