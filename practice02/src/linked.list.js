import _ from "lodash";

class Node {
  constructor(data) {
    this._data = data;
    this._next = null;
  }
}

export default class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  appendLast(data) {
    const aNode = new Node(data);
    if (this._head === null) this._head = aNode;
    else this._tail._next = aNode;

    this._tail = aNode;
    this._size += 1;
  }

  appendFirst(data) {
    const aNode = new Node(data);
    if (this._head === null) {
      this._head = aNode;
      this._tail = aNode;
    } else {
      aNode._next = this._head;
      this._head = aNode;
    }

    this._size += 1;
  }

  removeAt(pos) {
    if (pos < 0 || pos >= this._size) return null;

    let cur = this._head;

    if (pos === 0) {
      this._head = cur._next;
    } else {
      let prev;

      let index = 0;
      while (index++ < pos) {
        prev = cur;
        cur = prev._next;
      }

      prev._next = cur._next;
    }

    this._size -= 1;
    cur._next = null;

    return cur._data;
  }

  indexOf(data) {
    let cur = this._head;
    let index = 0;

    while (cur !== null) {
      // if (cur._data === data) return index;
      if (_.isEqual(cur._data, data)) return index;

      index += 1;
      cur = cur._next;
    }

    return -1;
  }

  get size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }
}
