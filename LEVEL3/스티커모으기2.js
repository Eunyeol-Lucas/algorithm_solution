function solution(sticker) {
  const len = sticker.length + 2;
  const arr1 = Array(len).fill(0);
  const arr2 = Array(len).fill(0);

  if (sticker.length === 1) return sticker[0];

  for (let i = 2; i < len - 1; i++) {
    arr1[i] = Math.max(arr1[i - 1], arr1[i - 2] + sticker[i - 2]);
  }
  for (let i = 3; i < len; i++) {
    arr2[i] = Math.max(arr2[i - 1], arr2[i - 2] + sticker[i - 2]);
  }

  return Math.max(arr1[arr1.length - 2], arr2[arr1.length - 1]);
}

const sticker = [14, 6, 5, 11, 3, 9, 42, 40];
console.log(solution(sticker));
