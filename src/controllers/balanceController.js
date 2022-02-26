let { balances, transactions } = require('../models')
const { isValidTransactionBeforeTimestamp } = require('../validators/transactionValidators')

// TODO: use NODE_ENV instead of optional parameters for testing
const spendPoints = (points, timestamp=Date.now(), customTransactions) => {
  transactions = customTransactions ?? transactions;
  let totalBalance = getTotalBalance(transactions);
  let costs = {}

  if (totalBalance < points) {
    throw new Error(`You are trying to spend ${points} points but you have only ${totalBalance} points.`)
  }

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

//TODO: have it compute total balance if we're testing for specific timestamp
function getTotalBalance(transactions) {
  let totalBalance = 0;
  for (let transaction of transactions?._heap) {
    totalBalance += transaction.points
  }

  return totalBalance;
}

module.exports = {
  spendPoints,
  getTotalBalance
}