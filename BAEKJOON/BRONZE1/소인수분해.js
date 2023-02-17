const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = +require("fs").readFileSync(filePath).toString().trim();

function solution(n) {
  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      console.log(i);
      n /= i;
    }
  }
}

solution(input);
