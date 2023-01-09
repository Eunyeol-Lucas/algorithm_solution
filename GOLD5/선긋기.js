const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const arr = input.slice(1).map((i) => i.split(" ").map(Number));

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = (curIdx / 2) >> 0;

    while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
      this.swap(parIdx, curIdx);
      curIdx = parIdx;
      parIdx = (curIdx / 2) >> 0;
    }
  }

  heappop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] < this.heap[curIdx]) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    }

    while (
      this.heap[leftIdx] < this.heap[curIdx] ||
      this.heap[rightIdx] < this.heap[curIdx]
    ) {
      const minIdx =
        this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }
}

// 시간 초과
function solution(n, arr) {
  let answer = 0;
  const q = new MinHeap();
  for (const x of arr) {
    q.heappush(x);
  }
  let [start, end] = q.heappop();
  while (q.size()) {
    const [n1, n2] = q.heappop();
    if (n1 <= end) {
      end = Math.max(end, n2);
    } else {
      answer += end - start;
      start = n1;
      end = n2;
    }
  }
  answer += end - start;
  return answer;
}

// 2876ms
// 기본적인 node 및 브라우저의 sort는 충분히 빠르다
// 배열의 인덱스에서 값을 가져오는 것 보다 값을 변수에 할당해서 사용하는 경우가 조금 더 빠르다. (백준 기준)
function sol(n, arr) {
  let answer = 0;
  arr.sort((a, b) => a[0] - b[0]);
  let [left, right] = arr[0];
  for (let i = 1; i < n; i++) {
    const [x, y] = arr[i];
    if (x <= right && y > right) {
      right = y;
    } else if (x > right) {
      answer += right - left;
      [left, right] = [x, y];
    }
  }
  answer += right - left;
  return answer;
}

// 3056ms
function sol1(n, arr) {
  let answer = 0;
  arr.sort((a, b) => a[0] - b[0]);
  let [left, right] = arr[0];
  for (let i = 1; i < n; i++) {
    if (arr[i][0] <= right && arr[i][1] > right) {
      right = arr[i][1];
    } else if (arr[i][0] > right) {
      answer += right - left;
      [left, right] = arr[i];
    }
  }
  answer += right - left;
  return answer;
}

const loop = 100000;
const graph = Array.from({ length: loop }, (_, i) => [i, i + 2]);
console.time("heap sort");
console.log(solution(loop, graph));
console.timeEnd("heap sort");
// 하지만 테스트 결과에서는 인덱스로 값을 부르는 경우가 조금 더 빨랐다
console.time("browser sort");
console.log(sol(loop, graph));
console.timeEnd("browser sort");

console.time("browser sort");
console.log(sol1(loop, graph));
console.timeEnd("browser sort");
