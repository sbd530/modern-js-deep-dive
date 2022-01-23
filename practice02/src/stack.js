class Node {
  constructor(elem) {
    this._elem = elem;
    this._preNode = null;
  }
}

export default class Stack {
  constructor() {
    this._latestNode = null;
    this._genesisNode = null;
    this._size = 0;
  }

  push(elem) {
    const aNode = new Node(elem);

    if (this._size === 0) {
      this._genesisNode = aNode;
      this._latestNode = aNode;
    } else {
      aNode._preNode = this._latestNode;
      this._latestNode = aNode;
    }
    this._size += 1;
    return this;
  }

  pop() {
    if (this._size === 0) return null;
    if (this._latestNode === this._genesisNode) this._genesisNode = null;
    const result = this._latestNode._elem;
    this._latestNode = this._latestNode._preNode;
    this._size -= 1;
    return result;
  }

  isEmpty() {
    return this._size === 0;
  }

  get size() {
    return this._size;
  }
}
