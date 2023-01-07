class Deque {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    if (this.storage[this.rear] === undefined) return 0;
    else this.rear - this.front + 1;
  }

  push(value) {
    if (this.size() === 0) this.storage[this.rear] = value;
    else {
      this.rear++;
      this.storage[this.rear] = value;
    }
  }

  shift() {
    let tmp;
    if (this.front === this.rear) {
      tmp = this.storage[this.front];
      delete this.storage[this.front];
      this.front = 0;
      this.rear = 0;
    } else {
      tmp = this.storage[this.front];
      delete this.storage[this.front];
      this.front++;
    }

    return tmp;
  }
}

const q = new Deque();
a = q.shift();

console.log(2 % Number.MAX_SAFE_INTEGER);
