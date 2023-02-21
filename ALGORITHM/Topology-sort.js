class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  push(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  pop() {
    const tmp = this.storage[this.front];
    if (!tmp) return false;
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

function solution(input) {
  // 노드 개수와 간선의 개수를 입력 받기
  const [v, e] = input[0];
  // 모든 노드에 대한 진입차수는 0으로 초기화
  const inDegree = Array.from({ length: v + 1 }, () => 0);
  // 각 노드에 연결된 간선 정보를 담기 위한 연결 리스트 초기화
  const graph = Array.from({ length: v + 1 }, () => new Array());

  // 방향 그래프의 모든 간선 정보를 입력 받기
  for (let i = 0; i < e; i++) {
    const [a, b] = input[i + 1];
    graph[a].push(b); // 정점 A에서 B로 이동 가능
    // 진입 차수를 1 증가
    inDegree[b] += 1;
  }

  // 위상 정렬 함수
  const topologySort = () => {
    let answer = "";
    const result = []; // 알고리즘 수행 결과를 담을 리스트
    const q = new Queue();

    // 처음 시작할 때는 진입차수가 0인 노드를 큐에 삽입
    for (let i = 1; i < v + 1; i++) {
      if (inDegree[i] === 0) {
        q.push(i);
      }
    }

    while (q.size) {
      const now = q.pop();
      result.push(now);
      for (const x of graph[now]) {
        inDegree[x] -= 1;
        if (inDegree[x] === 0) q.push(x);
      }
    }
    for (const x of result) {
      answer += x + " ";
    }
    console.log(answer);
  };
  topologySort();
}

const input = [
  [7, 8],
  [1, 2],
  [1, 5],
  [2, 3],
  [2, 6],
  [3, 4],
  [4, 7],
  [5, 6],
  [6, 4],
];

solution(input);
