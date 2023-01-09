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
      tmp = this;
      this.front++;
    }
    this.size--;
    return tmp;
  }
}
