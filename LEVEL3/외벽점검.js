const getPermutation = (arr, n) => {
  if (n === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
    const perms = getPermutation(rest, n - 1);
    const attached = perms.map((perm) => [fixed, ...perm]);
    result.push(...attached);
  });

  return result;
};

function solution(n, weak, dist) {
  const weakLen = weak.length;
  const flattenWeak = [...weak, ...weak.map((elem) => elem + n)];

  let answer = -1;
  dist.sort((a, b) => b - a);
  for (let i = 0; i <= dist.length; i++) {
    const permutation = getPermutation(dist, i);
    for (const permu of permutation) {
      for (let j = 0; j < weakLen; j++) {
        let line = flattenWeak.slice(j, weakLen + j);
        for (const p of permu) {
          const coverage = line[0] + p;
          line = line.filter((e) => e > coverage);
          if (!line.length) return i;
        }
      }
    }
  }

  return answer;
}

const n = 12,
  weak = [1, 5, 6, 10],
  dist = [1, 2, 3, 4];
console.log(solution(n, weak, dist));
