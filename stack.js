export class Stack {
  constructor() {
    this.tail = null;
    this.count = 0;
  }

  push(data) {
    const newNode = new Node(data, this.tail);
    this.tail = newNode;
    this.count++;
  }

  pop() {
    if (this.tail === null) {
      return null;
    }
    const poppedNode = this.tail;
    this.tail = this.tail.next;
    this.count--;
    return poppedNode.data;
  }

  peek() {
    return this.tail ? this.tail.data : null;
  }

  size() {
    return this.count;
  }

  get(index) {
    // Tjek først om tail er null, index er 0 og index er større end størrelsen af Stacken
    if (this.tail == null || index < 0 || index >= this.count) {
      return null;
    }
    let current = this.tail;
    let i = 0;
    while (current !== null && i < index) {
      current = current.next;
      i++;
    }
    return current ? current.data : null;
  }
}

class Node {
  next = null;
  data = null;

  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}
