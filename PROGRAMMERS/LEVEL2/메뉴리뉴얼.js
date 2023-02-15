function solution(orders, course) {
  var answer = [];

  for (const x of course) {
    obj = {};
    function dfs(v, cor, word) {
      if (cor.length === x) {
        if (obj[cor]) {
          obj[cor] += 1;
          return;
        }
        obj[cor] = 1;
        return;
      }
      for (let i = v; i < word.length; i++) {
        dfs(i + 1, [...(cor + word[i])].sort().join(""), word);
      }
    }
    for (const y of orders) {
      dfs(0, "", y);
    }
    let max = 0;
    let tmp = [];
    for (const z in obj) {
      if (obj[z] > 1) {
        if (max < obj[z]) {
          max = obj[z];
          tmp = [z];
        } else if (max === obj[z]) {
          tmp.push(z);
        }
      }
    }
    for (const k of tmp) {
      answer.push(k);
    }
  }
  answer.sort();
  return answer;
}
let orders = ["XYZ", "XWY", "WXA"],
  course = [2, 3, 4];
console.log(solution(orders, course));
