function solution(maps) {
  let answer = 1;
  let n = maps.length;
  let m = maps[0].length;
  const q = [];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  q.push([0, 0]);
  vst[0][0] = 1;
  while (q.length) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = q.shift();
      for (const [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && maps[nx][ny]) {
          if (nx == n - 1 && ny == m - 1) {
            return ++answer;
          }
          q.push([nx, ny]);
          maps[nx][ny] = 0;
        }
      }
    }
    answer++;
  }
  return -1;
}
