/**
 * Simple Binary Heap implemented using arrays to store
 * values and customizable for both min and max heaps via
 * custom comparison function that takes two values and
 * compares them, returning
 *  -1 if a<b;
 *   0 if a=b;
 *   1 if a>b;
 *
 * @param {function} comparisonSort optional custom comparison sort
 */
function BinaryHeap(comparisonSort) {
  this._heap = [];
  this._compare = (comparisonSort) ? comparisonSort : function (a, b) {
    if (a < b) {
      return 1
    }
    return (a > b) ? -1 : 0
  }
}

BinaryHeap.prototype.getRoot = function () {
  return this._heap[0];
}

BinaryHeap.prototype.insert = function (value) {
  const newPosition = this._heap.length;
  this._heap.push(value);
  this.bubbleUp(newPosition);

  return this;
}

BinaryHeap.prototype.removeRoot = function () {
  let root = this._heap[0]
  swap(this._heap, 0, this._heap.length - 1)
  this._heap.splice(this._heap.length - 1, 1);
  this.bubbleDown(0)

  return root;
}

BinaryHeap.prototype.bubbleUp = function(index) {
  let parentIndex = getParentIndex(index)

  if (this._compare(this._heap[parentIndex], this._heap[index]) < 0) {
    swap(this._heap, parentIndex, index)
    this.bubbleUp(parentIndex);
  }

  return;
}

BinaryHeap.prototype.bubbleDown = function(index) {
  let [leftChildIndex, rightChildIndex] = getChildren(index)
  let smallestChildIndex = null

  // Check if the children indexes are valid
  if (this._heap[leftChildIndex] != null && this._heap[rightChildIndex] != null) {
    smallestChildIndex = (this._compare(this._heap[leftChildIndex], this._heap[rightChildIndex]) > 0) ? leftChildIndex : rightChildIndex;
  } else if (this._heap[leftChildIndex] != null) {
    smallestChildIndex = leftChildIndex
  } else if (this._heap[rightChildIndex] != null) {
    smallestChildIndex = rightChildIndex
  }

  // Check if current Index is greater than it's child and if true, swap
  if (smallestChildIndex != null && this._compare(this._heap[index], this._heap[smallestChildIndex]) < 0) {
    swap(this._heap, index, smallestChildIndex)
    this.bubbleDown(smallestChildIndex);
  }

  return
}

BinaryHeap.prototype.toString = function() {
  return this._heap.toString();
}

function swap(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function getParentIndex(childIndex) {
  if (childIndex === 0) {
    return 0;
  } else if (childIndex % 2 === 0) {
    return (childIndex - 2) / 2;
  } else {
    return (childIndex - 1) / 2;
  }
}

function getChildren(parentIndex) {
  return [2*parentIndex + 1, 2*parentIndex + 2];
}

module.exports = BinaryHeap;