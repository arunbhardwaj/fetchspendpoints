const { balances, transactions } = require('../models');

const addTransactions = (body, cb) => {
  if (Array.isArray(body)) {
    for (let transaction of body) {
      balances[transaction.payer] = (balances[transaction.payer] ?? 0) + transaction.points;
      transactions.insert(transaction);
    }
  } else {
    balances[body.payer] = (balances[body.payer] ?? 0) + body.points;
    transactions.insert(body);
  }

  console.log(
    '============================',
    transactions._heap,
    '============================\n',
    { balances }
  );

  cb();
};

module.exports = addTransactions;
