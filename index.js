class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (true) {
        if (value < currentNode.value) {
          //Left
          if (!currentNode.left) {
            currentNode.left = newNode;
            return this;
          }
          currentNode = currentNode.left;
        } else {
          //Right
          if (!currentNode.right) {
            currentNode.right = newNode;
            return this;
          }
          currentNode = currentNode.right;
        }
      }
    }
  }
  lookup(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        return currentNode;
      }
    }
    return null
  }
  remove(value) {
    let parentNode = this.root;

    if (parentNode.value === value) {
      return value;
    }

    while (parentNode) {
      const nextKey = value > parentNode.value ? 'right' : 'left';

      if (parentNode[nextKey] && parentNode[nextKey].value === value) {
        const leftNext = parentNode[nextKey].left
        const rightNext = parentNode[nextKey].right

        if (rightNext) {
          let rightParentLeft = rightNext;
          let rightNodeLeft = rightParentLeft.left;

          while (rightNodeLeft.left) {
            rightParentLeft = rightNodeLeft
            rightNodeLeft = rightNodeLeft.left
          }

          rightParentLeft.left = rightNodeLeft.right

          rightNodeLeft.right = rightNext
          rightNodeLeft.left = parentNode[nextKey].left

          parentNode[nextKey] = rightNodeLeft;

        } else {
          parentNode[nextKey] = leftNext;
        }


        return value
      }

      parentNode = parentNode[nextKey]

    }

    return value;
  }
}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)

tree.insert(130)
tree.insert(125)
tree.insert(126)
// tree.insert(167)

// console.log(JSON.stringify(traverse(tree.root)))
tree.remove(20);
console.log(JSON.stringify(traverse(tree.root)))
// tree.lookup(15);
// tree.lookup(7);

//     9
//  4     20
//1  6  15  170
//        130
//      125
//         126
function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}





