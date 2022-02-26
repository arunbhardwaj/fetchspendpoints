const router = require('express').Router();
const { balances, transactions } = require('../models');
const { isValidTransactionData } = require('../validators/transactionValidators');

router.get('/', (req, res) => {
  res.status(200).json(transactions)
})

router.post('/', (req, res) => {
  const { body } = req
  if (!isValidTransactionData(body)) {
    res.status(400).json("Incorrect data format. Check your data and try again.")
    return
  }

  if (Array.isArray(body)) {
    for (let transaction of body) {
      balances[transaction.payer] = (balances[transaction.payer] ?? 0) + transaction.points
      transactions.insert(transaction)
    }
  } else {
    balances[body.payer] = (balances[body.payer] ?? 0) + body.points
    transactions.insert(body)
  }

  console.log('============================',
    transactions._heap,
    '============================\n',
    {balances})
  res.status(201).json("Accepted");
})

module.exports = router;
