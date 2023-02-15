function solution(dirs) {
  var answer = 0;
  const dir = {
    U: [1, 0],
    D: [-1, 0],
    R: [0, 1],
    L: [0, -1],
  };
  let [x, y] = [0, 0];
  let set = new Set();
  for (const e of dirs) {
    i = x + dir[e][0];
    j = y + dir[e][1];
    if (i >= -5 && i <= 5 && j >= -5 && j <= 5) {
      const line = (i + x) / 2 + "" + (j + y) / 2;
      if (!set.has(line)) {
        set.add(line);
        answer++;
      }
      x = i;
      y = j;
    }
  }
  return answer;
}

dirs = "ULURRDLLU";
console.log(solution(dirs));
