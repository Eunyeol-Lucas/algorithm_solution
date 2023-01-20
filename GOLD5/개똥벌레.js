/**
 * 유형: 구간 합
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, H] = input[0].split(" ").map(Number);
const arr = input.slice(1);


function solution(n, h, arr) {
  let result = [];
  const top = Array.from({ length: H }, () => 0);
  const btm = Array.from({ length: H }, () => 0);
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) btm[+arr[i] - 1]++;
    else top[+arr[i] - 1]++;
  }
  // 구간합을 계산하기 위해 구간 별로 몇개의 장애물이 존재하는지 계산
  // 4번째 구간 -> 높이 4 이상 석순, 3번째 구간 -> 높이 3 이상 석순,,,
  for (let i = h - 2; i > -1; i--) {
    btm[i] += btm[i + 1];
    top[i] += top[i + 1];
  }

  // top, button을 위치시키기 위해 한쪽의 석순을 뒤집음
  const down = btm.reverse();
  for (let i = 0; i < down.length; i++) {
    result.push(down[i] + top[i]);
  }
  const min = Math.min(...result);

  const cnt = result.filter((i) => i === min).length;
  return [min, cnt].join(" ");
}

console.log(solution(N, H, arr));

const binarySearch = (left, right, height, arr) => {
  let min = Number.MAX_SAFE_INTEGER;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] >= height) {
      min = Math.min(min, mid);
      right = mid - 1;
    } else left = mid + 1;
  }
  return min === Number.MAX_SAFE_INTEGER ? 0 : N / 2 - min;
};
function solution2(n, h, stones) {
  let min = Number.MAX_SAFE_INTEGER,
    cnt = 0;
  const up = Array.from({ length: n / 2 }, () => 0);
  const down = Array.from({ length: n / 2 }, () => 0);
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) down[i / 2] = +stones[i];
    else up[Math.floor(i / 2)] = +stones[i];
  }

  up.sort();
  down.sort();

  for (let i = 1; i <= h; i++) {
    let downCrush = binarySearch(0, n / 2 - 1, i, down);
    let upCrush = binarySearch(0, n / 2 - 1, h - i + 1, up);
    if (min > downCrush + upCrush) {
      min = downCrush + upCrush;
      cnt = 1;
    } else if (min === downCrush + upCrush) cnt++;
  }
  return [min, cnt].join(" ");
}

console.log(solution2(N, H, arr));

function solution3(n, h, input) {
  const up = Array.from({ length: h + 1 }, () => 0);
  const down = Array.from({ length: h + 1 }, () => 0);

  for (let i = 1; i < n + 1; i++) {
    const num = +input[i]
    if (i % 2 === 0) down[num]++;
    else up[num]++;
  }

  for (let i = h - 1; i > 0; i--) {
    up[i] += up[i + 1];
    down[i] += down[i + 1];
  }

  let min = Number.MAX_SAFE_INTEGER,
    cnt = 0;

  for (let i = 1; i < h + 1; i++) {
    const crush = down[i] + up[h - i + 1];
    if (crush < min) {
      min = crush;
      cnt = 1;
    } else if (crush === min) cnt++;
  }
  return [min, cnt].join(" ");
}

console.log(solution3(N, H, input));
