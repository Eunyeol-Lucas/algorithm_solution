/**
 * 유형: 위상정렬
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Queue {
  constructor() {
    this.storage = new Map();
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  add(value) {
    this.storage.set(this.rear, value);
    this.rear++;
    this.size++;
  }

  popLeft() {
    const tmp = this.storage.get(this.front);
    if (!tmp) return false;
    this.storage.delete(this.front);
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

function solution(n, residents, m, genealogy) {
  let ascents = [];
  let answerList = [];
  const inDegree = {};
  const graph = {};
  residents.sort();
  residents.forEach((i) => {
    inDegree[i] = 0;
  });
  residents.forEach((i) => {
    graph[i] = new Array();
  });
  for (const [a, b] of genealogy) {
    // 자식-(부모 or 조상)이 연결되어 있다면, 자식의 진입차수를 1 증가
    graph[b].push(a);
    inDegree[a] += 1;
  }
  const topologySort = () => {
    const result = {};
    const q = new Queue();

    for (const key of Object.keys(inDegree)) {
      result[key] = [];
      // 진입차수가 0인 경우 각 가문의 시조
      if (inDegree[key] === 0) {
        q.add(key);
        ascents.push(key);
      }
    }
    // 진입차수가 0이 된다면, 해당 자식은 직전에 큐에서 빼준 인원의 자식이기 때문에 따로 저장해 두고, 해당 자식은 큐에 삽입하여 준다.
    while (q.size) {
      const now = q.popLeft();
      for (const nextNode of graph[now]) {
        inDegree[nextNode]--;
        if (inDegree[nextNode] === 0) {
          q.add(nextNode);
          result[now].push(nextNode);
        }
      }
    }
    return result;
  };
  const result = topologySort();

  ascents.sort();
  let answer = "";
  answer += ascents.length + "\n" + ascents.join(" ") + "\n";
  for (const name of residents) {
    answer +=
      [name, result[name].length, result[name].sort().join(" ")].join(" ") +
      "\n";
  }
  return answer;
}

const N = +input[0];
const residents = input[1].split(" ");
const M = +input[2];
const genealogy = input.slice(3).map((i) => i.split(" "));

console.log(solution(N, residents, M, genealogy));
