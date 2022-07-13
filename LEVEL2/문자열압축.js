function solution(s) {
  var answer = s.length;

  const n = s.length;
  for (let i = 1; i <= parseInt(n / 2); i++) {
    let tmp = "";
    let prev = s.slice(0, i);
    let cnt = 1;
    let j = 0;

    for (j = i; j <= n; j += i) {
      let t = s.slice(j, j + i);
      if (t === prev) {
        cnt++;
      } else {
        if (cnt === 1) tmp += prev;
        else tmp += cnt + prev;

        prev = t;
        cnt = 1;
      }
    }
    if (cnt === 1) tmp += prev;
    else tmp += cnt + prev;
    answer = Math.min(tmp.length, answer);
  }
  return answer;
}

const s = "ababcdcdababcdcd";
console.log(solution(s));
