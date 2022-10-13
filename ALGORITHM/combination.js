const getCombination = (arr, n) => {
  if (n === 1) return arr.map((elem) => [elem]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combins = getCombination(rest, n - 1);
    const attached = combins.map((combi) => [fixed, ...combi]);
    result.push(...attached);
  });

  return result;
};

const arr = [1, 2, 3, 4];
console.log(getCombination(arr, 2));

const getPermutation = (arr, n) => {
  if (n == 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = [origin.slice(0, idx), ...origin.slice(idx + 1)];
    const perms = getPermutation(rest, n - 1);
    const attached = perms.map((perm) => [fixed, ...perm]);
    result.push(...attached);
  });

  return result;
};
