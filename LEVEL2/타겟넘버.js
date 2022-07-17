function solution(numbers, target) {
  var answer = 0;
  function dfs(v, sum) {
    if (v === numbers.length) {
      if (sum === target) {
        answer++;
        return;
      }
      return;
    }
    dfs(v + 1, sum - numbers[v]);
    dfs(v + 1, sum + numbers[v]);
  }
  dfs(0, 0);

  return answer;
}

const numbers = [1, 1, 1, 1, 1],
  target = 3;
console.log(solution(numbers, target));
