/**
 * 구현
 * 모든 방면으로 체크(브루트포스 일지두)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function check(arr, turn) {
  if (arr[0][0] === turn && arr[0][1] === turn && arr[0][2] === turn)
    return true;
  if (arr[1][0] === turn && arr[1][1] === turn && arr[1][2] === turn)
    return true;
  if (arr[2][0] === turn && arr[2][1] === turn && arr[2][2] === turn)
    return true;
  if (arr[0][0] === turn && arr[1][0] === turn && arr[2][0] === turn)
    return true;
  if (arr[0][1] === turn && arr[1][1] === turn && arr[2][1] === turn)
    return true;
  if (arr[0][2] === turn && arr[1][2] === turn && arr[2][2] === turn)
    return true;
  if (arr[0][0] === turn && arr[1][1] === turn && arr[2][2] === turn)
    return true;
  if (arr[2][0] === turn && arr[1][1] === turn && arr[0][2] === turn)
    return true;

  return false;
}

function solution(input) {
  let INVALID = "invalid",
    VALID = "valid";

  let xCnt = 0,
    oCnt = 0,
    index = 0;
  const arr = Array.from({ length: 3 }, () => Array(3).fill());
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      arr[i][j] = input[index];
      if (input[index] === "X") xCnt++;
      else if (input[index] === "O") oCnt++;
      index++;
    }
  }
  if (xCnt > oCnt + 1 || oCnt > xCnt) return INVALID;

  if (oCnt === xCnt) {
    if (check(arr, "O") && !check(arr, "X")) return VALID;
  }
  if (oCnt + 1 === xCnt) {
    if (check(arr, "X") && !check(arr, "O")) return VALID;
  }
  if (xCnt === 5 && oCnt === 4) {
    if (!check(arr, "O")) return VALID;
  }
  return INVALID;
}

for (const line of input) {
  if (line === "end") break;
  console.log(solution(line));
}
