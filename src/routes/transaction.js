const router = require('express').Router();
const { balances, transactions } = require('../models')

router.get('/', (req, res) => {
  res.status(200).json(transactions)
})

router.post('/', (req, res) => {
  const { body } = req
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
  res.sendStatus(200);
})

module.exports = router;
