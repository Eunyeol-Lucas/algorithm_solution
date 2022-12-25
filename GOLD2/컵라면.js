/**
 * 그리디, 우선순위큐
 * 우선순위큐를 사용하여
 * 입력받은 배열을 데드라인 기준, 오름차순으로 정렬
 * 맨 앞부터 컵라면수를 heap에 저장
 * 방문한 배열의 데드라인이 heap의 길이보다 작으면, heap에서 제거
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const arr = input.splice(1).map((i) => i.split(" ").map(Number));

class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    let parent = Math.floor((idx - 1) / 2);

    while (this.heap[parent] > value) {
      this.swap(parent, idx);
      idx = parent;
      parent = Math.floor((idx - 1) / 2);
    }
  }

  pop() {
    if (!this.size()) return;

    const res = this.heap.shift();
    if (this.size() === 0) return res;

    this.heap.unshift(this.heap.pop());
    let idx = 0;

    while (idx * 2 + 1 < this.size()) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.heap[left] < this.heap[next]) next = left;
      if (right < this.heap.length && this.heap[right] < this.heap[next])
        next = right;
      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
}

function solution(N, arr) {
  arr.sort((a, b) => a[0] - b[0]);
  const minHeap = new MinHeap();
  for (const [i, j] of arr) {
    minHeap.push(j);
    if (i < minHeap.size()) {
      console.log(i, j, minHeap.heap);
      minHeap.pop();
      console.log(minHeap.heap);
    }
  }

  const answer = minHeap.heap.reduce((acc, cur) => acc + cur);
  return answer;
}

console.log(solution(N, arr));
