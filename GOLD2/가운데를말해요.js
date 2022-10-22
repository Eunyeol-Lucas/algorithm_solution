const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const numberList = input.map(Number);

class MinHeap {
  constructor() {
    this.queue = [];
  }
  swap(a, b) {
    [this.queue[a], this.queue[b]] = [this.queue[b], this.queue[a]];
  }

  size() {
    return this.queue.length;
  }

  peek() {
    return this.queue[0];
  }

  enqueue(value) {
    this.queue.push(value);
    let idx = this.size() - 1;
    let parent = Math.floor((idx - 1) / 2);

    while (this.queue[parent] > value) {
      this.swap(parent, idx);
      idx = parent;
      parent = Math.floor((idx - 1) / 2);
    }
  }

  dequeue() {
    const res = this.queue.shift();
    if (this.size() === 0) return res;

    this.queue.unshift(this.queue.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.size()) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.queue[left] < this.queue[next]) next = left;
      if (right < this.size() && this.queue[right] < this.queue[next])
        next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res;
  }
}

class MaxHeap extends MinHeap {
  peek() {
    return this.queue[0] * -1;
  }
  enqueue(value) {
    value = value * -1;
    this.queue.push(value);
    let idx = this.size() - 1;
    let parent = Math.floor((idx - 1) / 2);

    while (this.queue[parent] > value) {
      this.swap(parent, idx);
      idx = parent;
      parent = Math.floor((idx - 1) / 2);
    }
  }

  dequeue() {
    const res = this.queue.shift();
    if (this.size() === 0) return res;

    this.queue.unshift(this.queue.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.size()) {
      let next = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (this.queue[left] < this.queue[next]) next = left;
      if (right < this.size() && this.queue[right] < this.queue[next])
        next = right;

      if (idx === next) break;

      this.swap(idx, next);
      idx = next;
    }
    return res * -1;
  }
}

class MediumHeap {
  constructor() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MaxHeap();
  }

  enqueue(value) {
    if (value > this.median()) {
      this.minHeap.enqueue(value);
    } else {
      this.maxHeap.enqueue(value);
    }
    if (this.minHeap.size() - this.maxHeap.size() > 1) {
      this.maxHeap.enqueue(this.minHeap.dequeue());
    }
    if (this.maxHeap.size() - this.minHeap.size() > 1) {
      this.minHeap.enqueue(this.maxHeap.dequeue());
    }
  }

  median() {
    if (this.minHeap.size() === 0 && this.maxHeap.size() === 0) {
      return Number.NEGATIVE_INFINITY;
    } else if (this.minHeap.size() === this.maxHeap.size()) {
      return Math.min(this.minHeap.peek(), this.maxHeap.peek());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      return this.minHeap.peek();
    } else return this.maxHeap.peek();
  }
}

function solution(N, numberList) {
  const answer = [];
  const mediumHeap = new MediumHeap();

  for (let i = 0; i < N; i++) {
    mediumHeap.enqueue(numberList[i]);
    answer.push(mediumHeap.median());
  }
  return answer.join("\n");
}

console.log(solution(N, numberList));
