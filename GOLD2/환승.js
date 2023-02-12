/**
 * 유형: 너비 우선 탐색
 * 모든 데이터를 인접 리스트 방식으로 저장하면 메로리 초과가 발생
 * 메모리를 효율적으로 사용하는 것이 이 문제의 핵심인듯
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enQueue(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  deQueue() {
    const tmp = this.storage[this.front];
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front++;
    }
    if (this.size) this.size--;
    return tmp;
  }
}

function solution(n, k, m, hyperTubes) {
  if (n === 1) return 1;

  // 각 역이 몇 번째 하이퍼 튜브를 지나가는 지 저장하기 위한 배열
  const stationList = Array.from({ length: n + 1 }, () => new Array());
  const hyperTubeList = Array.from({ length: m + 1 }, () => new Array());
  for (let i = 0; i < m; i++) {
    const hyperTube = hyperTubes[i].split(" ").map(Number);
    for (station of hyperTube) {
      stationList[station].push(i + 1);
    }
    hyperTubeList[i + 1] = hyperTube;
  }

  // 역 방문 체크
  const stationVstList = Array.from({ length: n + 1 }, () => false);
  // 하이퍼 튜브 방문 체크
  const hyperVstList = Array.from({ length: m + 1 }, () => false);
  const queue = new Queue();
  queue.enQueue([1, 1]);
  stationVstList[1] = true;

  while (queue.size) {
    const [now, cnt] = queue.deQueue();

    // 현재 역에서 이사용할 수 있는 하어피튜브 번호 저장
    const nextHyperList = [];
    for (const idx of stationList[now]) {
      if (!hyperVstList[idx]) {
        nextHyperList.push(idx);
        hyperVstList[idx] = true;
      }
    }

    for (const hyper of nextHyperList) {
      for (const stationIdx of hyperTubeList[hyper]) {
        if (!stationVstList[stationIdx]) {
          if (stationIdx === n) return cnt + 1;
          stationVstList[stationIdx] = true;
          queue.enQueue([stationIdx, cnt + 1]);
        }
      }
    }
  }

  return -1;
}

const [N, K, M] = input[0].split(" ").map(Number);
const hyperTubes = input.slice(1);

console.log(solution(N, K, M, hyperTubes));
