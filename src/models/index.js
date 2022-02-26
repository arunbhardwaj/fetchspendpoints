const BinaryHeap = require('../helpers/binaryHeap')

let balances = {}

// TODO: checking of time differences should be done reliably
// irrespective of daylight savings => standardize your time zone
let transactions = new BinaryHeap((b, a) => {
  let aDate = new Date(a.timestamp)
  let bDate = new Date(b.timestamp)
  if (aDate > bDate) {
    return 1
  }
  return (aDate < bDate) ? -1 : 0
})

/*
interface Transaction {
  payer: string;
  points: number;
  timestamp: Date;
}

interface Balance {
  [payer: string]: number;
}
*/

module.exports = {
  balances,
  transactions
}