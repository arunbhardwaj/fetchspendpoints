const router = require('express').Router();
const { spendPoints } = require('../controllers/balanceController');
const { balances } = require('../models');

router.get('/', (req, res) => {
  res.json(balances)
})

// Spending
router.put('/', (req, res) => {
  const { points, timestamp } = req.body
  try {
    let result = spendPoints(points, timestamp)
    res.json(result)
  } catch (err) {
    res.status(400).json(err.message)
  }
})

module.exports = router