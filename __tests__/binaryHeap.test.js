const BinaryHeap = require('../src/helpers/binaryHeap')


test('it should contain values in increasing order (min heap)', () => {
  let minHeap = new BinaryHeap()
  let temp = [9,5,3,2,34,7,6,3]
  for (let num of temp) {
    minHeap.insert(num)
  }
  expect(minHeap._heap.length).toBe(8)
  expect(minHeap.toString()).toBe('2,3,5,3,34,7,6,9')
})

test('it should contain values in decreasing order (max heap)', () => {
  let maxHeap = new BinaryHeap((a, b) => {
    if (a > b) {
      return 1
    }
    return (a < b) ? -1 : 0
  })
  let temp = [9,5,3,2,34,7,6,3]
  for (let num of temp) {
    maxHeap.insert(num)
  }
  expect(maxHeap._heap.length).toBe(8)
  expect(maxHeap.toString()).toBe('34,9,7,3,5,3,6,2')
})

test('it should remove the largest value and re-adjust accordingly (max heap)', () => {
  let maxHeap = new BinaryHeap((a, b) => {
    if (a > b) {
      return 1
    }
    return (a < b) ? -1 : 0
  })
  let temp = [9,5,3,2,34,7,6,3]
  for (let num of temp) {
    maxHeap.insert(num)
  }
  expect(maxHeap._heap.length).toBe(8)
  expect(maxHeap.removeRoot()).toBe(34)
  expect(maxHeap.toString()).toBe('9,5,7,3,2,3,6')
  expect(maxHeap._heap.length).toBe(7)
  expect(maxHeap.removeRoot()).toBe(9)
  expect(maxHeap.toString()).toBe('7,5,6,3,2,3')
  expect(maxHeap._heap.length).toBe(6)
  expect(maxHeap.removeRoot()).toBe(7)
  expect(maxHeap.toString()).toBe('6,5,3,3,2')
  expect(maxHeap._heap.length).toBe(5)
})
