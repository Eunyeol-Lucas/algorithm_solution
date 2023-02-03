class Heap {
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

// pop에서 shift와 unshift를 사용하기 때문에 시간 복잡도 증가
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
    const res = this.heap.shift();
    if (this.heap.length === 0) return res;

    this.heap.unshift(this.heap.pop());

    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
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

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(element, priority) {
    this.heap.push({ element, priority });
    this._heapifyUp();
  }

  dequeue() {
    if (this.heap.length === 1) {
      return this.heap.pop().element;
    }
    const max = this.heap[0].element;
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return max;
  }

  _heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      let parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex].priority <= this.heap[parentIndex].priority) {
        break;
      }
      [this.heap[currentIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[currentIndex],
      ];
      currentIndex = parentIndex;
    }
  }

  _heapifyDown() {
    let currentIndex = 0;
    const lastIndex = this.heap.length - 1;
    while (currentIndex < lastIndex) {
      let leftChildIndex = 2 * currentIndex + 1;
      let rightChildIndex = 2 * currentIndex + 2;
      let higherPriorityIndex;
      if (leftChildIndex <= lastIndex && rightChildIndex <= lastIndex) {
        higherPriorityIndex =
          this.heap[leftChildIndex].priority >=
          this.heap[rightChildIndex].priority
            ? leftChildIndex
            : rightChildIndex;
      } else if (leftChildIndex <= lastIndex) {
        higherPriorityIndex = leftChildIndex;
      } else {
        break;
      }
      if (
        this.heap[currentIndex].priority >=
        this.heap[higherPriorityIndex].priority
      ) {
        break;
      }
      [this.heap[currentIndex], this.heap[higherPriorityIndex]] = [
        this.heap[higherPriorityIndex],
        this.heap[currentIndex],
      ];
      currentIndex = higherPriorityIndex;
    }
  }
}

class PriorityQueue2 {
  constructor() {
    this.queue = [];
    this.lastIndex = 0;
  }

  enQueue(data) {
    this.queue.push(data); // 배열에 데이터 추가

    let parentIndex = this.lastIndex; // 부모 노드의 idnex 초기화
    while (true) {
      const childIndex = parentIndex; // 자식 노드의 index 값
      parentIndex = Math.ceil(parentIndex / 2) - 1;
      // 자식 노드의 인덱스를 통해 부모노드의 인덱스 값을 얻어낼 수 있음

      if (parentIndex < 0) break; // 최상위까지 비교했다면 break

      if (this.queue[parentIndex] < data) {
        this.queue[childIndex] = this.queue[parentIndex];
        this.queue[parentIndex] = data;
      }
    }
    this.lastIndex++; // 마지막 인덱스 ++
  }
  deQueue() {
    this.lastIndex--;
    const result = this.queue[0]; // 우선순위가 제일 높은 원소 반환

    const lastElement = this.queue.pop();

    if (this.queue.length === 0) return lastElement;

    this.queue[0] = lastElement;
    // 마지막 원소 얻어와서 최상위 노드에 설정

    let currentIndex = 0; // 현재 비교할 인덱스

    while (true) {
      const leftIndex = currentIndex * 2 + 1;
      const left = this.queue[leftIndex];

      const rightIndex = currentIndex * 2 + 2;
      const right = this.queue[rightIndex];

      const compareIndex = left > right ? leftIndex : rightIndex; // 큰 자식 노드와 비교
      const compare = this.queue[compareIndex]; // 비교당할 인덱스

      if (this.queue[currentIndex] < compare) {
        this.queue[compareIndex] = this.queue[currentIndex];
        this.queue[currentIndex] = compare;
        currentIndex = compareIndex; // 데이터 swap
      } else break;
    }

    return result; // 우선순위가 높은 값 반환
  }
}

const loop = 100000;
function minHeapTest() {
  const heap = new MinHeap();
  for (let i = 0; i <= loop; i++) {
    const tmp = Math.random() * 100;
    heap.push(tmp);
  }
  for (let i = 0; i <= loop; i++) {
    heap.pop();
  }
}

function heapTest() {
  const heap = new Heap();
  for (let i = 0; i <= loop; i++) {
    const tmp = Math.random() * 100;
    heap.heappush(tmp);
  }
  for (let i = 0; i <= loop; i++) {
    heap.heappop();
  }
}

function queueTest() {
  const queue = new PriorityQueue();
  for (let i = 0; i <= loop; i++) {
    const tmp = Math.random() * 100;
    queue.enqueue({ element: tmp, priority: tmp });
  }
  for (let i = 0; i <= loop; i++) {
    queue.dequeue();
  }
}

function queue2Test() {
  const queue = new PriorityQueue2();
  for (let i = 0; i <= loop; i++) {
    const tmp = Math.random() * 100;
    queue.enQueue(tmp);
  }
  for (let i = 0; i <= loop; i++) {
    queue.deQueue();
  }
}

console.time("minHeap");
minHeapTest();
console.timeEnd("minHeap");

console.time("heap");
heapTest();
console.timeEnd("heap");

console.time("Queue");
queueTest();
console.timeEnd("Queue");

console.time("Queue2");
queue2Test();
console.timeEnd("Queue2");
