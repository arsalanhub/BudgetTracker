class Node {
  constructor(data) {
    this.data = data;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

const newNode = (data) => {
  const new_node = new Node();
  new_node.data = data;
  new_node.left = null;
  new_node.right = null;
  new_node.height = 1;
  return new_node;
};

const height = (node) => {
  if (node === null) return 0;
  return node.height;
};

const getBalance = (node) => {
  if (node === null) return 0;
  return height(node.left) - height(node.right);
};

const rightRotate = (y) => {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;

  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;

  return x;
};

const leftRotate = (x) => {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;

  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;

  return y;
};

const insert = (node, key) => {
  if (node === null) return newNode(key);
  if (key < node.data) node.left = insert(node.left, key);
  else if (key > node.data) node.right = insert(node.right, key);
  else return node;

  node.height = 1 + Math.max(height(node.left), height(node.right));
  const balance = getBalance(node);

  if (balance > 1 && key < node.left.data) return rightRotate(node);
  else if (balance < -1 && key > node.right.data) return leftRotate(node);
  else if (balance > 1 && key > node.left.data) {
    node.left = leftRotate(node.left);
    return rightRotate(node);
  } else if (balance < -1 && key < node.right.data) {
    node.right = rightRotate(node);
    return leftRotate(node);
  }

  return node;
};

const inOrder = (arr, head) => {
  if (head) {
    inOrder(arr, head.left);
    arr.push(head.data);
    inOrder(arr, head.right);
  }
};

module.exports = {
  insert,
  inOrder,
  Node,
};
