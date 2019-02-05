/*
TODO: Create separate collections for Users, products, purchases, comments, other events ... 
      maintain dependencies
*/

let Data = [
  {
    id: 12,
    name: 'Michael Chang',
    email: 'michael.chang@email.com',
    role: 'User',
    amount: 8,
    events: [{
      id: 101,
      title: 'Hello',
      description: 'This is an event',
      quantity: 3
    },
    {
      id: 102,
      title: 'Again',
      description: 'Another event',
      quantity: 5
    }]
  },
  {
    id: 13,
    name: 'Edgar Smith',
    email: 'edgar.smith@email.com',
    role: 'User',
    amount: 25,
    events: [{
      id: 103,
      title: 'Title name',
      description: 'Edgars event',
      quantity: 20
    },
    {
      id: 104,
      title: 'Some text',
      description: 'Some event',
      quantity: 5
    }]
  },
  {
    id: 14,
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'Administrator',
    amount: 0
  }
]

module.exports = Data