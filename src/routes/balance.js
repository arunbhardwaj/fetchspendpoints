const router = require('express').Router();
const { spendPoints } = require('../controllers/balanceController');
const { balances, transactions } = require('../models');

router.get('/', (req, res) => {
  res.json(balances)
})

// Spending
router.post('/', (req, res) => {
  const { points, timestamp } = req.body
  console.log(`Trying to spend ${points} before time ${timestamp}.`)
  let result = spendPoints(points, timestamp)
  res.json(result)
})

module.exports = router