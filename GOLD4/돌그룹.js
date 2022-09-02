const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().split(" ");
const [A, B, C] = input.map(Number).sort((a, b) => a - b);
console.log(solution(A, B, C));

function solution(A, B, C) {
  if ((A + B + C) % 3) return 0;
  const set = new Set();

  const q = [[A, B, C]];

  const pushCalToQ = (x, y, z) => {
    const cal = [x * 2, y - x, z].sort((i, j) => i - j);
    if (!set.has(cal)) {
      set.add(cal);
      q.push(cal);
    }
  };

  while (q.length) {
    const [a, b, c] = q.shift();

    if (a === b && b === c) {
      return 1;
    }

    if (a !== b) {
      pushCalToQ(a, b, c);
    }
    if (a !== c) {
      pushCalToQ(a, c, b);
    }
    if (b !== c) {
      pushCalToQ(b, c, a);
    }
  }

  return 0;
}
