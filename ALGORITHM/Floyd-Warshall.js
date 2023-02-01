function floydWarshall(n, m, arr) {
  // 노드의 개수 및 간선의 개수
  const graph = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(Infinity)
  );

  // 자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  // 각 간선에 대한 정보를 입력받아, 그 값으로 초기화
  for (let i = 0; i < m; i++) {
    const [a, b, c] = arr[i];
    graph[a][b] = c;
  }

  // 점화식에 따라 플로이드 워셜 알고리즘을 수행
  for (let k = 1; k <= n; k++) {
    for (let a = 1; a <= n; a++) {
      for (let b = 1; b <= n; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }
  // 수행된 결과물 출력
  let answer = "";
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= n; b++) {
      if (graph[a][b] === Infinity) answer += "INFINITY" + "\n";
      else answer += graph[a][b] + " ";
    }
    answer += "\n";
  }
  return answer;
}

const N = 4,
  M = 7;
const arr = [
  [1, 2, 4],
  [1, 4, 6],
  [2, 1, 3],
  [2, 3, 7],
  [3, 1, 5],
  [3, 4, 4],
  [4, 3, 2],
];
console.log(floydWarshall(N, M, arr));
