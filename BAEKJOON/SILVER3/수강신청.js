/**
 * 유형: 구현
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [firstLine, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(k, l, arr) {
  const set = new Set();
  for (const x of arr) {
    if (!set.has(x)) {
      set.add(x);
    } else {
      set.delete(x);
      set.add(x);
    }
  }
  return [...set].slice(0, k).join("\n");
}

const [K, L] = firstLine.split(" ").map(Number);
console.log(solution(K, L, arr));
