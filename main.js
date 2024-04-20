const makeNode = (value_ = null, next_ = null) => {
  let value = value_;
  let next = next_;
  return { value, next };
};

const makeLinkedList = () => {
  let head = null;
  let tail = head;
  let size = 0;
  const append = (value) => {
    if (size === 0) {
      head = makeNode(value);
      tail = head;
    } else {
      tail.next = makeNode(value);
      tail = tail.next;
    }
    size += 1;
  };
  const prepend = (value) => {
    if (size === 0) {
      head = makeNode(value);
      tail = head;
    } else {
      const newNode = makeNode(value);
      newNode.next = head;
      head = newNode;
    }
    size += 1;
  };
  const at = (index) => {
    let current = head;
    for (let i = 0; i < index; i += 1) {
      current = current.next;
    }
    return current;
  };
  const pop = () => {
    if (size === 0) {
      throw new Error("List is empty");
    } else if (size === 1) {
      head = null;
      tail = head;
    } else {
      tail = at(size - 2);
      tail.next = null;
    }
    size -= 1;
  };
  const contains = (value) => {
    let current = head;
    while (current !== null) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  };
  const find = (value) => {
    let current = head;
    for (let i = 0; i < size; i += 1) {
      if (current.value === value) return i;
      current = current.next;
    }
    return null;
  };
  const toString = () => {
    let current = head;
    let output = "";
    for (let i = 0; i < size; i += 1) {
      output += `(${current.value})`;
      if (i !== size - 1) {
        output += "->";
      }
      current = current.next;
    }
    return output;
  };
  const insertAt = (value, index) => {
    if (index > size) {
      throw new Error(
        "List of size " +
          size +
          " is not big enough to insert element at index" +
          index
      );
    }
    if (index === size) {
      append(value);
    } else if (index === 0) {
      prepend(value);
    } else {
      const previous = at(index - 1);
      const current = previous.next;
      const newNode = makeNode(value);
      previous.next = newNode;
      newNode.next = current;
      size += 1;
    }
  };
  const removeAt = (index) => {
    if (index >= size) {
      throw new Error(
        "List of size " +
          size +
          " is not big enough to remove element at index" +
          index
      );
    } else if (index === 0) {
      head = head.next;
      size -= 1;
    } else if (index === size - 1) {
      pop();
    } else {
      const previous = at(index - 1);
      previous.next = previous.next.next;
      size -= 1;
    }
  };
  return {
    append,
    prepend,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

const testLinkedList = () => {
  const linkedList = makeLinkedList();
  linkedList.append(1);
  linkedList.prepend(2);
  linkedList.append(2);
  linkedList.append(3);
  linkedList.append(4);
  linkedList.append(5);
  linkedList.append(6);
  linkedList.prepend(7);
  console.log("Linked List: " + linkedList.toString());
  linkedList.pop();
  linkedList.pop();
  console.log("Popped twice");
  console.log("Linked List: " + linkedList.toString());
  console.log("Element at index 4: " + linkedList.at(4).value);
  console.log("Linked List contains Element 3? " + linkedList.contains(3));
  console.log("Where is element 2 located? " + linkedList.find(2));
  console.log("Where is element 9 located? " + linkedList.find(9));
  linkedList.insertAt(100, 0);
  linkedList.insertAt(10, 4);
  linkedList.insertAt(1000, 8);
  console.log("Linked List: " + linkedList.toString());
  linkedList.removeAt(4);
  linkedList.removeAt(0);
  linkedList.removeAt(6);
  console.log("Linked List: " + linkedList.toString());
};

testLinkedList();
