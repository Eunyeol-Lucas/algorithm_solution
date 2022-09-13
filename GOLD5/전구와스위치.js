const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const origin = [...input[0]].map(Number);
const target = [...input[1]].map(Number);

function solution(N, origin, target) {
  const compare = (a, b) => {
    for (let i = 0; i < N; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const push = (idx, tmp) => {
    if (idx > 0) {
      tmp[idx - 1] = tmp[idx - 1] ? 0 : 1;
    }
    tmp[idx] = tmp[idx] ? 0 : 1;
    if (idx < N - 1) {
      tmp[idx + 1] = tmp[idx + 1] ? 0 : 1;
    }
  };

  const division = (idx) => {
    const tmp = [...origin];
    let min = Number.MAX_SAFE_INTEGER;
    let cnt = 0;

    if (idx === 0) {
      tmp[0] = tmp[0] ? 0 : 1;
      tmp[1] = tmp[1] ? 0 : 1;
      cnt++;
    }

    for (let i = 0; i < N; i++) {
      if (tmp[i - 1] !== target[i - 1]) {
        push(i, tmp);
        cnt++;
      }
    }
    if (compare(tmp, target)) min = Math.min(min, cnt);
    return min;
  };

  let ans1 = division(0);
  let ans2 = division(1);

  const answer = Math.min(ans1, ans2);
  if (answer === Number.MAX_SAFE_INTEGER) {
    return -1;
  } else {
    return answer;
  }
  return false;
}

console.log(solution(N, origin, target));
