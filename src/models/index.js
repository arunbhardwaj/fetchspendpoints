const BinaryHeap = require('../helpers/binaryHeap')

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

let balances = {}

// TODO: checking of time differences should be done reliably
// irrespective of daylight savings => standardize your time zone
// There might be an error here with that.
let transactions = new BinaryHeap((b, a) => {
  let aDate = new Date(a.timestamp)
  let bDate = new Date(b.timestamp)
  if (aDate > bDate) {
    return 1
  }
  return (aDate < bDate) ? -1 : 0
})

module.exports = {
  balances,
  transactions
}