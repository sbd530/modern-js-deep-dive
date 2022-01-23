class Node {
  constructor(elem) {
    this._nextNode = null;
    this._elem = elem;
  }
}

export default class Queue {
  constructor() {
    this._firstNode = null;
    this._lastNode = null;
    this._size = 0;
  }

  push(elem) {
    const aNode = new Node(elem);

    if (this._size === 0) this._firstNode = aNode;
    else this._lastNode._nextNode = aNode;

    this._lastNode = aNode;
    this._size += 1;
  }

  pop() {
    if (this._size === 0) return null;

    const result = this._firstNode._elem;
    this._firstNode = this._firstNode._nextNode;
    this._size -= 1;
    if (this._size === 0) this._lastNode = null;
    return result;
  }

  isEmpty() {
    return this._size === 0;
  }

  get size() {
    return this._size;
  }
}
