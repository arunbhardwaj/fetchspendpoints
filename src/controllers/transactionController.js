let { balances, transactions } = require('../models');

const addTransactions = (body, cb) => {
  if (Array.isArray(body)) {
    for (let transaction of body) {
      const { payer, points, timestamp } = transaction;
      balances[payer] = (balances[payer] ?? 0) + points;
      transactions.insert({ payer, points, timestamp });
    }
  } else {
    const { payer, points, timestamp } = body;
    balances[payer] = (balances[payer] ?? 0) + points;
    transactions.insert({ payer, points, timestamp });
  }

  cb();
};

module.exports = addTransactions;
