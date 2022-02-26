# fetchspendpoints
Spend your ToysRUs points here.
<br/>
<br/>
## About the program


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

## POST `/api/balance`
Spends points from your balance

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