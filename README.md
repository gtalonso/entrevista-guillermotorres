# entrevista-guillermotorres

## Documentation


* Dependency installation.
```
npm install
```

* Running test
```
npm test
```

* Running the api
```
npm start
```

* Running with Docker
```
docker-compose build
docker-compose up
```

## Endpoints

* Save a card
```
post localhost:3000/creditcard

payload:
{
    "cardNumber": 4852313192360696, //amex cardNumber is 15 digits, 16 digits for the others
    "brandType: "visa", //valid brands visa, mastercard, amex, discover
    "userId": 1
}

response:

{
  "brandType": "visa",
  "maskedNumber": "************0696",
  "userId": "1",
  "primary": false // false if is not the first card
}

```

* Get user cards

```
get localhost:3000/creditcard?userId=1

response:

[
  {
    "primary": true,
    "userId": "1",
    "cardToken": "37e286603df0f3f374a60071fc96d45762f3bfaa5916ac5d859a1e8b3f0f3503",
    "brandType": "visa",
    "maskedNumber": "************0696"
  },
  {
    "primary": false,
    "userId": "1",
    "cardToken": "37e286603df0f3f374a60071fc96d45762f3bfaa5916ac5d859a1e8b3f0f3503",
    "brandType": "visa",
    "maskedNumber": "************0696"
  },
  {
    "primary": false,
    "userId": "1",
    "cardToken": "37e286603df0f3f374a60071fc96d45762f3bfaa5916ac5d859a1e8b3f0f3503",
    "brandType": "visa",
    "maskedNumber": "************0696"
  }
]
```