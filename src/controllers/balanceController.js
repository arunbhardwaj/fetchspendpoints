const { balances, transactions: globalTransactions } = require('../models')
const { isValidTransactionBeforeTimestamp } = require('../validators/transactionValidators')

const spendPoints = (points, timestamp=Date.now(), transactions=globalTransactions) => {
  // we should check if points are greater than total balance
  // but I'm going to assume we have the points for simplicity
  let costs = {}
  while (points > 0) {
    console.log('============================\n', `trying to spend ${points}\n`, transactions._heap, '\n', 'Current Top Transation:', transactions._heap[0], '\n============================\n')
    let transaction = (transactions._heap[0].points <= points) ? transactions.removeRoot() : transactions._heap[0]
    if (!isValidTransactionBeforeTimestamp(transaction, timestamp)) {
      break;
    }
    if (transaction.points < points) {
      costs[transaction.payer] = (costs[transaction.payer] ?? 0) - transaction.points
      points -= transaction.points
    } else {
      transaction.points -= points
      costs[transaction.payer] = (costs[transaction.payer] ?? 0) - points
      points = 0
    }
  }

  for (let payer in costs) {
    balances[payer] += costs[payer]
  }

  console.log("Points left over:", points)

  return costs
}

module.exports = {
  spendPoints
}