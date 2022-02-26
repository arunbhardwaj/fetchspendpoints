const router = require('express').Router();
const addTransactions = require('../controllers/transactionController');
const { isValidTransactionData } = require('../validators/transactionValidators');

router.get('/', (req, res) => {
  res.status(200).json(transactions);
});

router.post('/', (req, res) => {
  const { body } = req;

  if (!isValidTransactionData(body)) {
    res.status(400).json('Incorrect data format. Check your data and try again.');
    return;
  }

  addTransactions(body, () => {
    res.status(201).json('Accepted');
  });
});

module.exports = router;
