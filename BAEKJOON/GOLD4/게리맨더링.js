const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [N, population, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  add(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  popleft() {
    const tmp = this.storage[this.front];
    if (tmp !== 0 && !tmp) return false;
    delete this.storage[this.front];
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front++;
    }
    this.size--;
    return tmp;
  }
}

const getCombination = (arr, n) => {
  if (n === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combins = getCombination(rest, n - 1);
    const attached = combins.map((comb) => [fixed, ...comb]);
    result.push(...attached);
  });
  return result;
};

const bfs = (arr, bridge, populations) => {
  const start = arr[0];

  const q = new Queue();
  q.add(start);
  const vst = new Set();
  vst.add(start);
  let sum = 0;
  while (q.size) {
    const v = q.popleft();
    sum += populations[v];
    for (const u of bridge[v]) {
      if (!vst.has(u) && arr.includes(u)) {
        q.add(u);
        vst.add(u);
      }
    }
  }

  return [sum, vst.size];
};

function solution(n, populations, bridge) {
  let answer = Infinity;

  for (let i = 1; i <= Math.floor(n / 2); i++) {
    const combins = getCombination([...Array(n).keys()], i);

    for (const combi of combins) {
      const [sum1, v1] = bfs(combi, bridge, populations);
      const [sum2, v2] = bfs(
        [...Array(n).keys()].filter((x) => !combi.includes(x)),
        bridge,
        populations
      );
      if (v1 + v2 === n) {
        answer = Math.min(answer, Math.abs(sum1 - sum2));
      }
    }
  }
  if (answer === Infinity) answer = -1;

  return answer;
}

const populations = population.split(" ").map(Number);
const bridge = arr.map((i) =>
  i
    .split(" ")
    .filter((_, i) => i !== 0)
    .map((y) => y - 1)
);

console.log(solution(+N, populations, bridge));
