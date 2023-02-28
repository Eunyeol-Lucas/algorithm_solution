/**
 * 유형: 브루트포스, 백트래킹
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(n, standard, table) {
  let answer = Number.MAX_SAFE_INTEGER;
  let ingredientList = [];
  const [P, F, C, V] = standard;

  const dfs = (idx, nutrient, price, history) => {
    // 현재 최소값보다 클경우 비교할 필요 없으므로 return
    if (price > answer) return;
    // 현재까지 구매한 영양소 구조 분해
    const [p, f, c, v] = nutrient;
    // 현재까지 구매한 영양소가 기준치보다 많거나 같을경우 가격 비교
    if (p >= P && f >= F && c >= C && v >= V) {
      if (answer > price) {
        answer = price;
        ingredientList = history;
      }
      // 식재료를 더 구매할 필요 없으므로 return
      return;
    }
    // 예외처리
    if (idx >= n) return;
    const [P1, F1, C1, V1, PRICE] = table[idx];
    // 해당 index에 위치한 배열의 식재료를 구매할 경우
    dfs(idx + 1, [p + P1, f + F1, c + C1, v + V1], price + PRICE, [
      ...history,
      idx + 1,
    ]);
    // 해당 index에 위치한 배열의 식재료를 구매하지 않을 경우
    dfs(idx + 1, [p, f, c, v], price, history);
  };

  dfs(0, [0, 0, 0, 0], 0, []);

  return answer !== Number.MAX_SAFE_INTEGER
    ? answer + "\n" + ingredientList.join(" ")
    : -1;
}

const N = +input[0];
const standard = input[1].split(" ").map(Number);
const table = input.slice(2).map((i) => i.split(" ").map(Number));
console.log(solution(N, standard, table));
