function solution(n, works) {
  let answer = 0;
  const worksLen = works.length;
  if (worksLen > 20000 || worksLen < 1 || n > 1000000) return answer;

  let sum = works.reduce((acc, cur) => acc + cur, 0);
  if (sum <= n) return 0;
  let max = -1;
  let idx = -1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < worksLen; j++) {
      if (max < works[j]) {
        max = works[j];
        idx = j;
      }
    }
    max = --works[idx];
  }

  for (let j = 0; j < worksLen; j++) {
    answer += works[j] * works[j];
  }
  return answer;
}

class MaxHeap {
  constructor() {
    this.maxHeap = [];
  }

  swap(a, b) {
    [this.maxHeap[a], this.maxHeap[b]] = [this.maxHeap[b], this.maxHeap[a]];
  }

  size() {
    return this.maxHeap.length;
  }
  push(value) {
    this.maxHeap.push(value);
    let idx = this.maxHeap.length - 1;
    let parentIndex = Math.floor((idx - 1) / 2);

    while (this.maxHeap[parentIndex] < value) {
      this.swap(parentIndex, idx);
      idx = parentIndex;
      parentIndex = Math.floor((idx - 1) / 2);
    }
  }

  pop() {
    if (this.maxHeap.length < 1) return null;

    const res = this.maxHeap.shift();
    if (this.maxHeap.length === 0) return res;

    this.maxHeap.unshift(this.maxHeap.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.maxHeap.length) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.maxHeap[left] > this.maxHeap[next]) next = left;

      if (
        right < this.maxHeap.length &&
        this.maxHeap[right] > this.maxHeap[next]
      )
        next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
  getHeap() {
    return this.maxHeap;
  }
}

function solution2(n, works) {
  let answer = 0;
  const worksLen = works.length;
  if (worksLen > 20000 || worksLen < 1 || n > 1000000) return answer;
  const maxHeap = new MaxHeap();
  for (const x of works) {
    maxHeap.push(x);
  }
  for (let i = 0; i < n; i++) {
    let max = maxHeap.pop();
    if (max < 1) {
      maxHeap.push(max);
      break;
    }
    maxHeap.push(--max);
  }
  const heap = maxHeap.getHeap();
  for (const x of heap) {
    answer += x * x;
  }
  return answer;
}

const works = [4, 3, 3],
  n = 4;

// const works = [8, 1, 1, 1, 1, 1, 1],
//   n = 3;
// console.log(solution(n, works));
console.log(solution2(n, works));
