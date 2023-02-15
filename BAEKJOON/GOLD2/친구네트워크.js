const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const test = +input.shift();

function findParent(parent, x) {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x]);
  }
  return parent[x];
}

function unionParent(parent, count, a, b) {
  a = findParent(parent, a);
  b = findParent(parent, b);
  if (a < b) {
    parent[b] = a;
    count[a] += count[b];
  } else if (a > b) {
    parent[a] = b;
    count[b] += count[a];
  }
}

function solution(N, friendList) {
  const friendObj = {};
  const count = {};
  let idx = 1;
  for (const friends of friendList) {
    for (const friend of friends) {
      if (!friendObj[friend]) {
        friendObj[friend] = friend;
        count[friend] = 1;
      }
    }
    unionParent(friendObj, count, friends[0], friends[1]);
    console.log(count[findParent(friendObj, friends[0])]);
  }
}

for (let i = 0; i < test; i++) {
  const N = +input.shift();
  const friendList = input.splice(0, N).map((friends) => friends.split(" "));
  solution(N, friendList);
}
