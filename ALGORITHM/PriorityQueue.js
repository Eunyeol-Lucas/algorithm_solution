class PriorityQueue {
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
