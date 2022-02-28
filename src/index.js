const express = require('express');
const { balanceRouter, transactionRouter } = require('./routes');

const app = express();
app.use(express.json());
app.use('/api/balance', (req, res, next) => {
  if (req.method === 'PUT') {
    req.body.timestamp = req.body.timestamp ?? Date.now()
  }
  next()
})

const PORT = process.env.PORT || 3000;

app.use('/api/balance', balanceRouter);
app.use('/api/transaction', transactionRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
