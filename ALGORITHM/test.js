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
    this.size--;
    return tmp;
  }
}

const Deque = (() => {
  class Deque {
    constructor() {
      this.count = 0;
      this.front = null;
      this.rear = null;
    }

    put_front(value) {
      const node = new Node(value);
      if (!this.front) {
        this.front = node;
        this.rear = node;
      } else {
        const next = this.front;
        this.front = node;
        this.front.next = next;
        next.prev = node;
      }
      return ++this.count;
    }

    get_front() {
      if (!this.front) {
        return false;
      }
      const data = this.front.data;
      this.front.prev = null;
      this.front = this.front.next;
      this.count--;
      return data;
    }

    put_rear(value) {
      const node = new Node(value);
      if (!this.front) {
        this.front = node;
        this.rear = node;
      } else {
        node.prev = this.rear;
        this.rear.next = node;
      }
      this.rear = node;
      return ++this.count;
    }

    get_rear() {
      if (!this.front) {
        return false;
      }
      let temp = this.rear;
      temp.prev.next = null;
      this.rear = temp.prev;
      temp = null;
      this.count--;
    }

    front() {
      return this.head && this.head.data;
    }

    rear() {
      return this.rear && this.rear.data;
    }
  }
  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
  }
  return Deque;
})();

const loop = 100000;

function arrayTest() {
  const q = [];
  for (let i = 0; i <= loop; i++) {
    q.push(i);
  }
  for (let i = 0; i <= loop; i++) {
    q.shift();
  }
}

function queueTest() {
  const q = new Queue();

  for (let i = 0; i <= loop; i++) {
    q.add(i);
  }
  for (let i = 0; i <= loop; i++) {
    q.popleft();
  }
}

function dequeTest() {
  const deque = new Deque();
  for (let i = 0; i <= loop; i++) {
    deque.put_front(i);
  }

  for (let i = 0; i <= loop; i++) {
    deque.get_front();
  }
}

function arrayUnshiftTest() {
  const q = [];
  for (let i = 0; i <= loop; i++) {
    q.unshift(i);
  }
  for (let i = 0; i <= loop; i++) {
    q.shift();
  }
}

function dequeUnshiftTest() {
  const deque = new Deque();
  for (let i = 0; i <= loop; i++) {
    deque.put_front(i);
  }
  for (let i = 0; i <= loop; i++) {
    deque.get_front(i);
  }
}

console.time("Array Time Measure");
arrayTest();
console.timeEnd("Array Time Measure");

console.time("Queue Time Measure");
queueTest();
console.timeEnd("Queue Time Measure");

// console.time("Deque Time Measure");
// dequeTest();
// console.timeEnd("Deque Time Measure");

console.time("Array Unshift Time Measure");
arrayUnshiftTest();
console.timeEnd("Array Unshift Time Measure");

console.time("Deque Unshift Time Measure");
dequeUnshiftTest();
console.timeEnd("Deque Unshift Time Measure");
