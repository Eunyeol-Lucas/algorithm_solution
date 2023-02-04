class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enQueue(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  deQueue() {
    const tmp = this.storage[this.front];
    if (!tmp) return null;
    delete this.storage[this.front];
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front++;
    }
    this.size--;
    return tmp;
  }
}

function solution(missionaries, cannibals, boatCapacity) {
  let answer = -1;
  const right = [missionaries, cannibals];
  const left = [0, 0];
  let direction = true;

  const queue = new Queue();
  queue.enQueue([[...right], [...left], direction, 0]);
  while (queue.size) {
    const [r, l, dir, cnt] = queue.deQueue();
    let [mr, cr] = r;
    let [ml, cl] = l;
    if (mr === 0 && cr === 0) {
      answer = cnt;
      break;
    }
    if (dir) {
      for (let i = 0; i <= boatCapacity; i++) {
        for (let j = 0; j <= boatCapacity; j++) {
          const move = i + j;
          if (move && move <= boatCapacity && mr >= i && cr >= j) {
            if (
              (mr - i >= cr - j || mr - i === 0) &&
              (ml + i >= cl + j || ml + i === 0)
            ) {
              if (ml + i === 0 && ml + j === 0) continue;
              queue.enQueue([
                [mr - i, cr - j],
                [ml + i, cl + j],
                !dir,
                cnt + 1,
              ]);
            }
          }
        }
      }
    } else {
      for (let i = 0; i < boatCapacity; i++) {
        for (let j = 0; j < boatCapacity; j++) {
          const move = i + j;
          if (move && move <= boatCapacity && ml >= i && cl >= j) {
            if (
              (ml - i >= cl - j || ml - i === 0) &&
              (mr + i >= cr + j || mr + i === 0)
            ) {
              if (ml - i === 0 && ml - j === 0) continue;
              queue.enQueue([
                [mr + i, cr + j],
                [ml - i, cl - j],
                !dir,
                cnt + 1,
              ]);
            }
          }
        }
      }
    }
  }
  return answer;
}

console.log(solution(2, 2, 2));
console.log(solution(2, 2, 1));
