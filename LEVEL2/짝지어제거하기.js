function solution(s) {
  var answer = 0;
  let flag = 1;
  while (s.length && flag) {
    let x = "";
    const tmp = [];
    flag = 0;
    for (const y of s) {
      if (y === x) {
        flag = 1;
        x = "";
      }
      if (y !== x) {
        if (x) tmp.push(x);
        x = y;
      }
    }
    if (flag) answer = 1;
    s = tmp;
  }
  return answer;
}

const s = "cdcd";
console.log(solution(s));
