const isValidTransactionData = (body) => {
  return isValidTransaction(body) || isValidTransactionArray(body)
}

const isValidTransaction = (transaction) => {
  if (transaction.payer == undefined || transaction.points == undefined || transaction.timestamp == undefined) {
    return false
  }

  if (typeof transaction.payer !== 'string' || typeof transaction.points !== 'number') {
    return false
  }
  return true
}

const isValidTransactionArray = (transactions) => {
  if (!Array.isArray(transactions)) {
    return false
  }

  for (let transaction of transactions) {
    if (!isValidTransaction(transaction)) {
      return false
    }
  }

  return true
}

const isValidTransactionBeforeTimestamp = (transaction, timestamp) => {
  let transactionDate = (transaction.timestamp instanceof Date) ? transaction.timestamp : new Date(transaction.timestamp)
  let timestampDate = (timestamp instanceof Date) ? timestamp : new Date(timestamp)

  return (transactionDate <= timestampDate)
}

module.exports = {
  isValidTransaction,
  isValidTransactionArray,
  isValidTransactionData,
  isValidTransactionBeforeTimestamp
}