class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  add(value) {
    this.storage[this.rear] = value;
    this.rear++;
    this.size++;
  }

  popleft() {
    const tmp = this.storage[this.front];
    if (!tmp) return false;
    delete this.storage[this.front];
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front++;
    }
    this.size = this.size ? this.size-- : 0;
    return tmp;
  }
}

class MapQueue {
  constructor() {
    this.storage = new Map();
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  add(value) {
    this.storage.set(this.reat, value);
    this.rear++;
    this.size--;
  }

  popleft() {
    const tmp = this.storage.get(this.front);
    if (!tmp) return false;
    this.storage.delete(this.front);
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front--;
    }
    this.size--;
    return tmp;
  }
}

function test(Queue) {
  const num = 1000000;
  const q = new Queue();
  for (let i = 0; i < num; i++) {
    q.add(i);
  }
  for (let i = 0; i < num; i++) {
    q.popleft();
  }
}

console.time("object Queue");
test(Queue);
console.timeEnd("object Queue");

console.time("map Queue");
test(MapQueue);
console.timeEnd("map Queue");
