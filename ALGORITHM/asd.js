const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const target = input[0];
const encodingWay = input[1];

const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
const alphabetList = [...alphabet];
function solution(target, way) {
  const encodingBoard = Array.from({ length: 5 }, () => []);
  const tmp = [];
  for (const x of way) {
    if (tmp.indexOf(x) === -1) {
      tmp.push(x);
    }
  }
  for (const x of alphabetList) {
    if (tmp.indexOf(x) === -1) {
      tmp.push(x);
    }
  }
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cnt = 5 * i + j;
      encodingBoard[i].push(tmp[cnt]);
    }
  }
  const wordList = changeWord(target);

  for (const [a, b] of wordList) {
    for (let i = 0; i < 5; i++) {
      if (encodingBoard[i].includes(a) && encodingBoard[i].includes(b)) {

      }
    }
  }


  return wordList;
}

function changeWord(word) {
  const wordList = [];
  for (let i = 0; i < word.length; i = i + 2) {
    const tmp = word.substr(i, 2);
    if (tmp.length === 1) {
      wordList.push(tmp + "X");
    } else {
      if (tmp[0] === tmp[1]) {
        if (tmp[0] === "X") {
          wordList.push(tmp[0] + "Q");
        } else {
          wordList.push(tmp[0] + "X");
        }
        i -= 1;
      } else {
        wordList.push(tmp);
      }
    }
  }
  return wordList;
}

// console.log(changeWord("HELLOWORD"));

console.log(solution(target, encodingWay));
