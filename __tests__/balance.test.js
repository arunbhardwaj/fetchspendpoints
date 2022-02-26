const BinaryHeap = require('../src/helpers/binaryHeap');
const transactionData = require('../transactionData.json');
const { spendPoints, getTotalBalance } = require('../src/controllers/balanceController');

let mockBalances;
let mockTransactions;

beforeEach(() => {
  mockBalances = {};
  mockTransactions = new BinaryHeap((b, a) => {
    let aDate = new Date(a.timestamp);
    let bDate = new Date(b.timestamp);
    if (aDate > bDate) {
      return 1;
    }
    return aDate < bDate ? -1 : 0;
  });

  for (let transaction of transactionData) {
    // necessary to insert a copy as our implementation modifies our transaction points if we retain extra points after spending
    mockTransactions.insert(Object.assign({}, transaction));
    mockBalances[transaction.payer] = (mockBalances[transaction.payer] ?? 0) + transaction.points;
  }
});

describe('spendPoints function tests', () => {
  test('it should output blank object if no spending', () => {
    expect(mockBalances).toEqual({ UNILEVER: 200, DANNON: 1100, 'MILLER COORS': 10000 });
    let result = spendPoints(0, '2020-11-01T14:00:00Z');
    expect(result).toEqual({});
  });

  test('it should output correct object after spending', () => {
    expect(mockBalances).toEqual({ UNILEVER: 200, DANNON: 1100, 'MILLER COORS': 10000 });
    let result = null;
    try {
      result = spendPoints(5000, Date.now(), mockTransactions);
    } catch (err) {}
    expect(result).toEqual({ DANNON: -100, UNILEVER: -200, 'MILLER COORS': -4700 });
  });

  test('it should spend points in a row correctly', () => {
    expect(mockBalances).toEqual({ UNILEVER: 200, DANNON: 1100, 'MILLER COORS': 10000 });
    let result = spendPoints(1000, Date.now(), mockTransactions);
    expect(result).toEqual({ DANNON: -100, UNILEVER: -200, 'MILLER COORS': -700 });
    result = spendPoints(1000, Date.now(), mockTransactions);
    expect(result).toEqual({ 'MILLER COORS': -1000 });
    result = spendPoints(8400, Date.now(), mockTransactions);
    expect(result).toEqual({ 'MILLER COORS': -8300, DANNON: -100 });
  });

  test('it should spend points from a different date correctly', () => {
    let result = spendPoints(1000, '2020-11-01T13:00:00Z', mockTransactions);
    expect(result).toEqual({ DANNON: -100, UNILEVER: -200 });
  });
});

describe('totalBalances function tests', () => {
  test('it should display the correct total balance', () => {
    expect(mockBalances).toEqual({ UNILEVER: 200, DANNON: 1100, 'MILLER COORS': 10000 });
    expect(getTotalBalance(mockTransactions)).toBe(11300);
  });
});
