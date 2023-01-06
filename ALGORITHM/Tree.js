class Tree {
  constructor(val) {
    this.val = val;
    this.leftNode = null;
    this.rightNode = null;
  }

  setVal(val) {
    this.val = val;
  }

  setLeft(node) {
    this.leftNode = node;
  }

  setRight(node) {
    this.rightNode = node;
  }
}

function recursivePreOrder(callback, node) {
  if (!node) return;
  callback(node.val);
  this.recursivePreOrder(node.leftNode);
  this.recursivePreOrder(node.rightNode);
}

function recursiveInOrder(callback, node) {
  if (!node) return;
  this.recursiveInOrder(node.leftNode);
  callback(node.val);
  this.recursiveInOrder(node.rightNode);
}

function recursivePostOrder(callback, node) {
  if (!node) return;
  this.recursivePostOrder(node.leftNode);
  this.recursivePostOrder(node.rightNode);
  callback(node.val);
}

function iterativePreOrder(callback, node) {
  if (!node) return;
  const stack = [];
  stack.push(node);
  while (stack.length) {
    const popNode = stack.pop();
    callback(popNode.val);
    if (popNode.left) stack.push(popNode.left);
    if (popNode.right) stack.push(popNode.right);
  }
}

function iterativeInOrder(callback, node) {
  if (!node) return;
  const stack = [];
  let currentNode = node;
  while (true) {
    if (currentNode !== null) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else if (stack.length) {
      currentNode = stack.pop();
      callback(currentNode.val);
      currentNode = currentNode.right;
    } else break;
  }
}

function iterativePostOrder(callback, node) {
  if (!node) return;
  let currentNode = node;
  const stack = [];
  let lastVisitNode = null;
  while (true) {
    if (currentNode !== null) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    } else if (stack.length) {
      peekNode = stack[stack.length - 1];
      if (peekNode.right !== null && lastVisitNode !== peekNode.right) {
        currentNode = peekNode.right;
      } else {
        callback(peekNode.val);
        lastVisitNode = stack.pop();
      }
    } else break;
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key) {
    let newNode = new Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
}

let tree = new BinarySearchTree();
tree.insert(11); // 11은 루트노드가 된다.
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
console.log(tree);

const printNode = (value) => {
  console.log(value);
};

const printNode1 = (value) => {
  console.log(value);
};

const printNode2 = (value) => {
  console.log(value);
};

tree.preOrderTraverse(printNode);
tree.inOrderTraverse(printNode1);
tree.postOrderTraverse(printNode2);
