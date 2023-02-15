function solution(begin, target, words) {
  let answer = 0;
  let vst = [];
  let q = [];

  if (!words.includes(target)) return answer;

  q.push([begin, answer]);
  while (q.length) {
    let [v, cnt] = q.shift();

    if (v === target) {
      return cnt;
    }

    words.forEach((word) => {
      let notEqual = 0;
      if (vst.includes(word)) return;

      for (let i = 0; i < word.length; i++) {
        if (word[i] !== v[i]) notEqual++;
      }

      if (notEqual === 1) {
        q.push([word, ++cnt]);
        vst.push(word);
      }
    });
  }

  return answer;
}

const begin = "hit",
  target = "cog",
  words = ["hot", "dot", "dog", "lot", "log", "cog"];

console.log(solution(begin, target, words));
