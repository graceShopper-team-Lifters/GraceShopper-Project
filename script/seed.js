'use strict'

const {db, models: {User, Product, Orders, Review, Order_items} } = require('../server/db')

// ----Products----
const products = [{
  name: 'Patience (For Traffic)',
  description: 'For those who regularly have the most atrocious commutes to work or otherwise this is for you!!',
  price: 25,
  category: 'Patience'
}, {
  name:'Discipline (Walking the dog)',
  description: `Tired of finding..."gold" or "bronze" in your home, buy this discipline and you're guarenteed to have a 25% decrease in discovering "treasure" for 6 months!!`,
  price: 30,
  category: 'Discipline'
}, {
  name: 'Patience (Long lines)',
  description: 'Have a palpapable dislike for waiting in lines or perhaps, for whatever reason, find yourself hating whoever is in front of said line? Buy this patience to increase your tolerance by 15%',
  price: 15,
  category: 'Patience'
}];

// ---Reviews-----
const reviews = [{
  comment: `Before purchasing 'walking the dog' my home was filled with "brown suprises" and "yellow accents" (not very aromatic). Now the smell is mostly gone and there are usually yellow accents!!!`,
  productId: 2
}, {
  comment: "I used to keep a baseball bat in my backseat while driving, but after purchasing 'traffic', Im significantly less angry and im starting to obey traffic laws!!",
  productId: 1
}, {
  comment: "Before buying 'Long Lines,' I was known in the neighborhood as the person who yells at the people ahead. Now, with patience for long lines, I wait for them to finish their irrelevant conversation with the cashier before I begin.",
  productId: 3
}]

// ----Users------
const users = [{
  username: 'cody',
  email: 'codyCodes@yahoo.com',
  password: '123'
}, {
  username: 'murphy',
  email: 'comedicmurph@gmail.com',
  password: '123'
}, {
  username: 'stacey',
  email:'staceysMom@yahoo.com',
  password: '123'
}]

async function seed() {

  try {
    await db.sync({ force: true }) 
    console.log('db synced!')

    const createdUsers = await Promise.all(users.map(user => User.create(user)))

    await Promise.all(createdUsers.map( async (user) => {
      const order = await Orders.create();
      await order.setUser(user);
    }));

    await Promise.all(products.map(product => {
      return Product.create(product);
    }));

    await Promise.all(reviews.map(review => {
      return Review.create(review);
    }))
    
  } catch (error) {
    console.log(error)
  }
<<<<<<< HEAD
=======


 
>>>>>>> master

}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
