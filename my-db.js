// MongoDB 
// Tällä scriptillä voidaan alustaa Mongo kanta uudelleen
show dbs
db
use mydb
db.mycustomers.find().pretty()
db.mycustomers.drop()
db.mycustomers.insertMany([
  {
    "id": 12,
    "name": "Michael Chang",
    "email": "michael.chang@email.com",
    "role": "User",
    "transactions": [
      901,
      902
    ],
    "events": [
      101,
      102,
      103
    ],
    "address": {
      "street": "Kuja 12",
      "zip": "02150",
      "city": "Espoo",
      "country": "Finland"
    }
  },
  {
    "id": 13,
    "name": "Brad Smith",
    "email": "brad.smith@email.com",
    "role": "User",
    "transactions": [
      903
    ],
    "events": [
      104
    ],
    "address": {
      "street": "Katu 23",
      "zip": "00100",
      "city": "Helsinki",
      "country": "Finland"
    }
  },
  {
    "id": 14,
    "name": "Edgar Adams",
    "email": "edgar.adams@email.com",
    "role": "user",
    "address": {
      "street": "Polku 34",
      "zip": "01300",
      "city": "Vantaa",
      "country": "Finland"
    }
  },
  {
    "id": 15,
    "name": "Andy Peterson",
    "email": "andy.peterson@email.com",
    "role": "Administrator",
    "address": {
      "street": "Avenue 15",
      "zip": "02100",
      "city": "Espoo",
      "country": "Finland"
    }
  }
]
)

db.myproducts.find().pretty()
db.myproducts.drop
db.myproducts.insertMany([
  {
    "id": 222,
    "type": "Phone",
    "make": "Samsung",
    "model": "XYZ",
    "price": 123,
    "in-stock": 44,
    "description": "Samsung XYZ kuvaus",
    "nr-events": 7
  },
  {
    "id": 223,
    "type": "Phone",
    "make": "Sony",
    "model": "Z5",
    "price": 234,
    "in-stock": 55,
    "description": "Sony Z5 kuvaus",
    "nr-events": 8
  },
  {
    "id": 224,
    "type": "Phone",
    "make": "Nokia",
    "model": "N9",
    "price": 345,
    "in-stock": 33,
    "description": "Nokia N9 kuvaus",
    "nr-events": 9
  }
]
)

db.myevents.find().pretty()
db.myevents.drop
db.myevents.insertMany([
  {
    "id": 101,
    "user": 12,
    "product": 222,
    "time": "2019-02-10T10:15:46.164Z",
    "type": "Review",
    "title": "Michaels title",
    "description": "Michaels comment on Samsung XYZ",
    "grade": 2
  },
  {
    "id": 102,
    "user": 12,
    "product": 222,
    "time": "2019-02-12T12:15:46.164Z",
    "type": "Reclamation",
    "title": "Bad Product",
    "description": "It did not work",
    "grade": 1
  },
  {
    "id": 103,
    "user": 12,
    "product": 224,
    "time": "2019-02-13T13:15:46.164Z",
    "type": "Review",
    "title": "Another title",
    "description": "Review on Nokia N9",
    "grade": 4
  },
  {
    "id": 104,
    "user": 13,
    "product": 222,
    "time": "2019-02-13T14:15:46.164Z",
    "type": "Review",
    "title": "Review title",
    "description": "Review of Samsung XYZ ",
    "grade": 3
  }
])

db.mytransactions.find().pretty()
db.mytransactions.drop
db.mytransactions.insertMany([
  {
    "id": 901,
    "user": 12,
    "product": 222,
    "time": "2019-02-11T10:15:46.164Z",
    "type": "purchase",
    "price": 123
  },
  {
    "id": 902,
    "user": 12,
    "product": 224,
    "time": "2019-02-12T12:15:46.164Z",
    "type": "purchase",
    "price": 300
  },
  {
    "id": 903,
    "user": 13,
    "product": 222,
    "time": "2019-02-14T13:15:46.164Z",
    "type": "purchase",
    "price": 123
  }
])


db.mycustomers.find().forEach(user => {
  let transactions = []
  db.mytransactions.find().forEach(transaction => {
    if (transaction.user == user.id) {
      transactions.push(transaction._id)
      db.mytransactions.update(transaction, { $set: { "user": user._id } })
    }
  })
  db.mycustomers.update(user, { $set: { "transactions": transactions } })
})

db.mycustomers.find().forEach(user => {
  let events = []
  db.myevents.find().forEach(event => {
    if (event.user == user.id) {
      events.push(event._id)
      db.myevents.update(event, { $set: { "user": user._id } })
    }
  })
  db.mycustomers.update(user, { $set: { "events": events } })
})

db.mytransactions.find().forEach(transaction => {
  db.myproducts.find().forEach(product => {
    if (transaction.product == product.id) {
      db.mytransactions.update(transaction, { $set: { "product": product._id } })
    }
  })
})

db.myevents.find().forEach(event => {
  db.myproducts.find().forEach(product => {
    if (event.product == product.id) {
      db.myevents.update(event, { $set: { "product": product._id } })
    }
  })
})
