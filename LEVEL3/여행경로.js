/**
 * 유형: DFS or BFS
 */

function solution(tickets) {
  let answer = ["ICN"];
  const paths = {};
  let start = "ICN";
  for (const [a, b] of tickets) {
    if (paths[a]) {
      paths[a].push(b);
    } else paths[a] = [b];
  }

  const vst = {};

  for (const x in paths) {
    // 기본적으로 알파벳 순서이기 때문에 정렬
    paths[x].sort();
    vst[x] = Array.from({ length: paths[x].length }, () => 0);
  }
  let used = 0;
  const dfs = (from) => {
    if (paths[from]) {
      const pCache = [...answer];
      for (let i = 0; i < paths[from].length; i++) {
        // 이미 사용한 티켓일 경우 통과
        if (vst[from][i]) continue;
        const to = paths[from][i];
        answer.push(to);
        used++;
        vst[from][i] = 1;
        // 모든 티켓을 소진하지 않았을 경우 원상태로 복귀, 다음 티켓부터 사용
        if (!dfs(to)) {
          answer = pCache;
          used--;
          vst[from][i] = 0;
        }
      }
    }
    // 티켓을 모두 소진해야하므로 사용된 티켓의 수가 발행된 테켓 수와 일치 여부 확인
    return tickets.length === used;
  };

  dfs(start);
  return answer;
}

// const tickets = [
//   ["ICN", "JFK"],
//   ["HND", "IAD"],
//   ["JFK", "HND"],
// ];
const tickets = [
  ["ICN", "A"],
  ["ICN", "B"],
  ["B", "ICN"],
];
// tickets = [
//   ["ICN", "A"],
//   ["A", "B"],
//   ["A", "B"],
//   ["B", "A"],
// ];
console.log(solution(tickets));
