# fetchspendpoints
Spend your ToysRUs points here.

### Design decisions

- Used a binary heap instead of standard array for storing transactions as it would yield a better time complexity for any subsequent points expenditures + transaction additions
- Added optional timestamp field to the points expenditure `PUT` endpoint `/api/balance`. This was to purely make testing easier as it's quicker and less error-prone to test by altering a single timestamp than by altering your entire dataset.
- Made the endpoint for points expenditure the `PUT` to `/api/balance`. In following the RESTful API's noun convention, I couldn't decide on a "good" noun for points expenditure. It made more sense to me to envision our points expenditure as *updating* our user's balance with our request.

### Next steps

- Add and use environment variables for testing purposes and to separate my "production" code from development/testing e.g. spendPoints function in `balanceController.js`
- Implement integration tests for endpoints
- "Permanently" store the total balance (available points) of a user
- Validate the data sent to points endpoint and perhaps have it use the total balance to validate
- Use a well-tested library (collectionsjs?) for binary heap instead of my own
- Use UTC timezone (perhaps through environment variable) as there may be weird potential interactions that break functionality around Nov 6 and Mar 13 OR
- Use a date library (date-fns?) that accounts for daylight savings and different timezones


<br/>
<br/>

## How To Install and Run

### Download
1. Clone the directory. Alternatively you can download the files and extract to directory of your choosing.
2. `cd` into the directory

### Installation
1. Install packages by running `npm install` in the command line.

### Running the server
1. Run `npm run start` to start the app on `http://localhost:3000/` by default.
2. If you'd like to specify your own port, you can run `PORT={portOfYourChoosing} npm run start`
3. You can now send HTTP requests to that endpoint and observe the responses.

<br/>
<br/>

## Testing
### Set Up
1. Ensure that `jest` dependency is installed. Run `npm install` if you haven't already done so.

### Running the tests
1. Run `npm run test` to start the testing suite.

<br/>
<br/>
<br/>
<br/>

# API Documentation

## GET `/api/balance`
Retrieves the points per payer/partner balance of the user.

RESPONSE
> Response: Status 200 OK
```json
{
    "UNILEVER": 200,
    "DANNON": 1100,
    "MILLER COORS": 10000,
    "TOYS 'R' US": 9000
}
```

<br/>

## PUT `/api/balance`
Spends points from your balance and updates your balance.

Parameter | Type | Description
-------|------|------------
points | Number | Required number of points to spend
[timestamp] | String or Number | Optional timestamp (ms after epoch or timestamp string) for simulating spending points at a specific point in time. Used for testing. Default is `Date.now()`

EXAMPLE REQUEST
```json
{ "points": "11300", "timestamp": "2020-11-02T14:00:00Z" }
```

RESPONSE
> Response: Status 200 OK
```json
{
    "TOYS 'R' US": -9000,
    "DANNON": -100,
    "UNILEVER": -200,
    "MILLER COORS": -2000
}
```

> Response: Status 400 Bad Request
```json
"You are trying to spend 20400 points but you have only 20300 points."
```

<br/>

## POST `/api/transaction`
Adds single or multiple [Transaction] objects to earn points.

>Transactions JSON Array

EXAMPLE REQUESTS
> Transaction[]
```json
[
  { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
  { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
  { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
  { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
  { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" },
  { "payer": "TOYS \'R\' US", "points": 9000, "timestamp": "2017-09-18T04:00:00.000Z" }
]
```

> Transaction JSON Object
```json
{ "payer": "TOYS \'R\' US", "points": 9000, "timestamp": "2017-09-18T04:00:00.000Z" }
```

Parameter | Type | Description
-------|------|------------
payer | String | Required name of the payer awarding points
points | Number | Required number of points awarded by payer
timestamp | String or Number | Required timestamp of the time when points are awarded



RESPONSE
> Response: Status 201 Accepted
```json
"Accepted"
```

> Response: Status 400 Bad Request
```json
"Incorrect data format. Check your data and try again."
```