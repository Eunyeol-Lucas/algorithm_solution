const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require("fs").readFileSync(filePath).toString().split("\n");
let T = +input.shift();

for (let i = 0; i < T; i++) {
  const [origin, target] = input[i].split(" ").map(Number);
  console.log(solution(origin, target));
}

function D(origin) {
  return (origin * 2) % 10000;
}

function S(origin) {
  return origin === 0 ? 9999 : origin - 1;
}

function L(origin) {
  return (origin % 1000) * 10 + Math.floor(origin / 1000);
}

function R(origin) {
  return (origin % 10) * 1000 + Math.floor(origin / 10);
}

function solution(origin, target) {
  const vst = Array.from({ length: 10000 }, () => 0);
  vst[origin] = 1;
  const q = [[origin, ""]];

  while (q.length) {
    let [cur, path] = q.shift();
    if (cur === target) {
      return path;
    }

    const nextD = D(cur);
    const nextS = S(cur);
    const nextL = L(cur);
    const nextR = R(cur);

    if (!vst[nextD]) {
      vst[nextD] = 1;
      q.push([nextD, path + "D"]);
    }
    if (!vst[nextS]) {
      vst[nextS] = 1;
      q.push([nextS, path + "S"]);
    }
    if (!vst[nextL]) {
      vst[nextL] = 1;
      q.push([nextL, path + "L"]);
    }
    if (!vst[nextR]) {
      vst[nextR] = 1;
      q.push([nextR, path + "R"]);
    }
  }
}
