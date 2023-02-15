/**
 * 유형: 그리디
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(w, jewerlies) {
  let answer = 0;
  jewerlies.sort((a, b) => b[1] - a[1]);
  for (const [weight, price] of jewerlies) {
    if (w <= 0) break;
    if (w >= weight) {
      w -= weight;
      answer += weight * price;
    } else {
      answer += w * price;
      w = 0;
    }
  }
  return answer;
}

const [W, N] = input[0].split(" ").map(Number);
const jewerlies = input.slice(1).map((i) => i.split(" ").map(Number));
console.log(solution(W, jewerlies));
