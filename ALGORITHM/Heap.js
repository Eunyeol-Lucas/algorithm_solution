class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    let isertIdx = this.queue.length;
    while (isertIdx >= 1 && this.queue[Math.floor(isertIdx / 2)] <= element) {
      this.queue[isertIdx] = this.queue[Math.floor(isertIdx / 2)];
      isertIdx = Math.floor(isertIdx / 2);
    }
    this.queue[isertIdx] = element;
  }

  dequeue() {
    let delValue = this.queue[1]; // 삭제 될 값
    let lastValue = this.queue.pop(); // 큐의 마지막 값
    this.queue[0] = lastValue; // 삭제 될 위치에 큐의 마지막 값을 넣어줌

    let qSize = this.queue.length - 1; //현재 배열에서 값이 들어갈 수 있는 최대 idx
    let pIdx = 1; // 탐색을 시작할 부모idx
    let cIdx = 2; // 탐색을 시작할 자식idx

    while (cIdx <= qSize) {
      // 두 자식중 큰 노드와 부모 노드와 비교
      if (this.queue[cIdx] < this.queue[cIdx + 1]) {
        cIdx += 1;
      }

      // 만약 자식 노드와 비교해서 크다면 더이상 검사할 필요가 없으므로 break
      if (lastValue >= this.queue[cIdx]) {
        break;
      }

      /*
            만약 자식노드가 더 큰 경우 !
            현재 부모노드 값에 자식 값을 넣어주고
            부모 idx를 자식 idx를 바꾸고 자식 idx를 왼쪽 자식 노드idx로 바꿔주고 다시 검사
             */
      this.queue[pIdx] = this.queue[cIdx];

      pIdx = cIdx; // 검사할 부모노드는 현재 자식 노드 idx로
      cIdx *= 2; // 자식 노드의 왼쪽 자식 노드 idx로
    }

    // 검사 후 나온 pIdx에 lastValue값을 넣어줌
    this.queue[pIdx] = lastValue;

    return delValue;
  }

  front() {
    return this.queue[1];
  }

  size() {
    return this.queue.length - 1;
  }

  clear() {
    this.queue = [];
  }
}

let pq = new PriorityQueue();
pq.enqueue([1, 2, 3]);
pq.enqueue([5, 2, 3]);
pq.enqueue([10, 2, 3]);
pq.enqueue([50, 2, 3]);
pq.enqueue([6, 2, 3]);
console.log(pq);
pq.clear();
console.log(pq);
