function solution(n, signs) {
  for (let i = 0; i < n; i++) {
    const stk = [];
    for (let j = 0; j < n; j++) {
      if (signs[i][j] === 1) stk.push(j);
    }
    console.log(stk);
    while (stk.length) {
      const x = stk.pop();
      for (let q = 0; q < n; q++) {
        if (signs[x][q] && signs[i][q] === 0) {
          signs[i][q] = 1;
          stk.push(q);
        }
      }
    }
  }

  return signs;
}

const n = 3,
  signs = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ];

console.log(solution(n, signs));
