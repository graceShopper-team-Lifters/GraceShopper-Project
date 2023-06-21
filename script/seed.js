'use strict'

const {db, models: {User, Product, Orders, Review, Order_items} } = require('../server/db')

// ----Products----
const products = [{
  name: 'Patience For Traffic',
  subHeader: "Rush Hour is Prime Time!",
  description: `This item is highly popular among those who leave work at rush hour. Before using this item, you'll hate traffic and everyone in front of you. After using this item, you'll love everyone on the road and may even cause traffic yourself!`,
  imageURL:"https://png.pngtree.com/background/20230401/original/pngtree-bored-man-in-car-waiting-in-traffic-jam-vector-picture-image_2240547.jpg",
  price:25,
  category: 'Patience'
}, {
  name:'Discipline for Weight Loss',
  subHeader: "Throw Away That Scale!",
  description: `Weight loss can be tough, and sticking to it is often very difficult. Using this item will enable you to instantly hate all of your favorite foods. Use with caution, though, because using too much will cause you to hate all of your favorite people.`,
  imageURL:"https://images.huffingtonpost.com/2015-01-29-FotoliaBeforeandafter-thumb.jpg" ,
  price:30,
  category: 'Discipline'
}, {
  name: 'Patience for Long lines',
  subHeader:"Great for Annoying Conversations!",
  description: `We all end up waiting in long lines eventually. Have you ever been held up because of a customer's conversation with the cashier? If so, this is for you! Use this item to enjoy, and even contribute to things holding up lines.`,
  imageURL:"https://learningspanishlikecrazy.com/wp-content/uploads/2015/08/waiting-long-lines-supermarket.png",
  price:15,
  category: 'Patience'
}, {
  name: "Discipline for Alarm Clocks",
  subHeader: "Hit the Snooze Button Just Once!",
  description: `Many people report hitting the snooze button several times before getting out of bed. After using "Discipline for Alarm Clocks," you'll hit the snooze button once and fly out of bed! Note: this item does not work if alarm clock is smashed.`,
  imageURL: "https://www.dreams.co.uk/sleep-matters-club/wp-content/uploads/shutterstock_162882851.jpg",
  price:40,
  category: 'Discipline',
}, {
  name: "Discipline for Elevators",
  subHeader: "Hold the Door Open for Everyone!",
  description: `This item is for those who push the "close" button on elevators to avoid waiting for others. Use this product to assist in developing a reputation for being patient with those slow walkers.`,
  imageURL: "https://www.etiquetteschoolofamerica.com/wp-content/uploads/2013/09/Going-Up__-The-Top-7-Savvy-Tips-for-Riding-Elevators-scaled.jpeg",
  price:10,
  category:'Discipline',
}, {
  name: "Discipline for Commuters",
  subHeader:"Every Commute is Peaceful!",
  description:"Often, commuting can be a hassle. This is due to traffic, unruly passengers, and other avoidable obstacles. Take this product immediately after an inconvenience to achieve tolerance for rude commuters.",
  imageURL:"https://st2.depositphotos.com/2117297/7573/i/950/depositphotos_75733473-stock-photo-happy-best-friends-in-subway.jpg",
  price:25,
  category:'Discipline',
}, {
  name:"Discipline for Punctuality",
  subHeader:"Get. There. Now.",
  description:`This item is popular with those who tend to be "fashionably late" to important events. Use this item when someone tells you they'll be late. After item use, you won't mind their lateness and may even prefer they don't arrive at all!`,
  imageURL:"https://www.exboyfriendrecovery.com/wp-content/uploads/2015/10/Dollarphotoclub_91705243-copy.jpg",
  price:31,
  category:'Discipline',
},{
  name:"Discipline for Procrastination",
  subHeader:"Later is Not an Option.",
  description: `Procrastination is a problem we all have, or are currently dealing with at some point. Fortunately, this product exists to prevent procrastination for urgent tasks. This item is popular among those who do not contribute to group work.`,
  imageURL:"https://images.theconversation.com/files/503789/original/file-20230110-21-ai5g6x.jpg?ixlib=rb-1.1.0&rect=0%2C9%2C6553%2C4352&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  price:50,
  category:'Discipline',
}, {
  name:"Charisma for Speeches",
  subHeader:"Make it Memorable for All!",
  description: `This item is for those who dread making speeches. After using "Charisma for Speeches," you'll love getting up and speaking through the heart! Our introverts have experienced the best results. `,
  imageURL:"https://assets.entrepreneur.com/content/3x2/2000/20160303162410-businesswoman-speaker-speech-presentation-meeting-conference-talk-seminar-guest.jpeg",
  price:43,
  category:'Charisma',
}, {
  name:"Charisma for Parties",
  subHeader:"Become the Life of the Party!",
  description:`At some point in your life, you've probably gone to a party because you had to. After using this item, you'll become the life of the party anywhere you go. This item contains no alcohol but mimics someone who's six drinks in! `,
  imageURL:"https://www.mpcevents.com/images/BlogPics/lifeoftheparty_16x9.jpg",
  price:34,
  category:'Charisma',
}, {
  name:"Charisma for Holidays",
  subHeader:"You'll be the one Celebrated!",
  description:`The holidays are a time of year that often brings people together to celebrate different faiths. After taking this item, you'll have enough charisma to draw all of the attention. Take this with food for best results. `,
  imageURL:"https://thedacare.org/wp-content/uploads/2021/10/friends-and-family-enjoying-holiday-dinner.jpg?w=1424&h=900&crop=1",
  price:15,
  category:'Charisma',
}, {
  name:"Charisma for Interviews",
  subHeader:"Charisma for Interviews",
  description:`Interviews of all types can be stressful. If you lack any confidence or interest in sitting through the interview, then this item is for you. "Charisma for Interviews" brightens your smile and allows you to shine no matter the topic.`,
  imageURL:"https://insightglobal.com/wp-content/uploads/2022/10/man-interviewing-scaled-e1665689472861-900x600.jpg",
  price:35,
  category:'Charisma',
}, {
  name:"Charisma for Climate",
  subHeader:"It's Always Sunny in...",
  description: `This item is for those whose mood is affected by inclement weather. After using this product, you'll be the most outgoing person in the room during all storms, dangerous or not. This item is perfect for those living in Seattle.`,
  imageURL:"https://livepurposefullynow.com/wp-content/uploads/2013/08/bigstock-Woman-in-raincoat-smiling-as-s-35505551-e1375633792254.jpg",
  price:15,
  category:'Charisma',
}, {
  name:"Charisma for Accidents",
  subHeader:"It's Never Your Fault!",
  description:`Nobody is perfect, and those who claim to be are wrong. However, using this item, you'll always feel and look like you're innocent, even when you're not. This item works instantly, take right before accidents for best results. `,
  imageURL:"https://previews.123rf.com/images/kadmy/kadmy1403/kadmy140300239/27895401-woman-behind-steering-wheel-happy-unguilty-female-driver-after-car-crash-accident-collision-in-city.jpg",
  price:42,
  category:'Charisma',
}, {
  name:"Attitude for Managers",
  subHeader:"Seem Happy at Work!",
  description:`"Attitude for Managers" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`,
  imageURL:"https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp",
  price:55,
  category:'Attitude',
}, {
  name:"Attitude for News Networks ",
  subHeader:"Appear to Enjoy the News!",
  description:`Attitude for News Networks" enables you to enjoy all of the depressing news that our world has to offer. This item applies to every news network no matter the size! This attitude item lasts for 2 months.`,
  imageURL:"https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321230/man-looking-distressed.jpg",
  price:10,
  category:'Attitude',
}, {
  name:"Attitude for Teenagers",
  subHeader:"Tolerate Your Child's Antics!",
  description:`Attitude for Teenagers" is popular among parents who have teenaged children. You may not understand why your teen son and/or daughter does what they do, but with this item, you'll now have a full understanding.`,
  imageURL:"https://expatchild.com/wp-content/uploads/2015/03/expat-parent-teen-relationship.jpg",
  price:20,
  category:'Attitude',
}, {
  name:"Attitude for Traffic Violations",
  subHeader:"Seem Happy in Court!",
  description:`Do you have trouble smiling in front of the judge in traffic court? If so, this item is for you! Use this item in court to smile and convince the judge that it will never happen again. This also applies if you do intend on getting another ticket, anyway.`,
  imageURL:"https://www.pevansatlaw.com/wp-content/uploads/2020/02/bigstock-Police-Writing-Ticket-3024488.jpg",
  price:34,
  category:'Attitude',
}, {
  name:"Attitude for Studying",
  subHeader:"Make Cramming Fun!",
  description:`Attitude for Studying" is suitable for those who procrastinate studying until the last minute. Our customers have reported an 80% increase in enjoyment when cramming at night, especially for subjects you won't need in your career.`,
  imageURL:"https://static.scientificamerican.com/sciam/cache/file/F9153FF5-1150-480C-957E215D33FBBBDB_source.jpg?w=590&h=800&51EEC77F-AE6D-4B79-842220197A30C887",
  price:15,
  category:'Attitude',
}, {
  name:"Attitude for Exes",
  subHeader:"Every Breakup is a Good One!",
  description:`This item is highly desired during the holidays, especially Valentine's day. Some breakups are rough, but this item will enable you to only remember the bad times! "Attitude for Exes lasts 6 months.`,
  imageURL:"https://markmanson.net/wp-content/uploads/2016/04/couple-break-up-broken-heart.jpg",
  price:40,
  category:'Attitude',
}, {
  name:"Patience for Colleagues",
  subHeader:"Enjoy Conversing with All Colleagues!",
  description:`This item is bought and often used on Monday mornings. Our customers have reported a large increase in patience at work and seem more interested in how their colleague's weekend actually went.`,
  imageURL:"https://nycofficesuites.com/wp-content/uploads/2018/04/Woman-frustrated-by-annoying-coworker.jpg",
  price:50,
  category:'Patience',
}, {
  name:"Patience for Wrong Orders",
  subHeader:"Every Order is the Right One!",
  description:`Whether it's at a restaurant, e-commerce site, or anything else, this item enables the user to love all orders that come their way. After using this item, users will smile and enjoy the situation. This item is most effective in restaurants.`,
  imageURL:"https://www.postscanmail.com/wp-content/uploads/2021/11/Wrong-Shipping-Address-on-an-Online-Order.jpg",
  price:12,
  category:'Patience',
}, {
  name:"Patience for Parents",
  subHeader:"Every Child is an Angel!",
  description:`Attention educators! If you've ever had challenging interactions with parents of your students, we have a solution for you! Introducing "Patience for Parents" - a product designed to help you maintain a positive and understanding attitude towards every parent. With "Patience for Parents," you'll find it easier to foster productive relationships and see every child in a positive light.`,
  imageURL:"https://jeanawhitaker.com/wp-content/uploads/2022/09/stressed-teacher-scaled.jpg",
  price:25,
  category:'Patience',
}, {
  name:"Patience for In-Laws",
  subHeader:"Every Interaction is Pleasant!",
  description:`"Patience for In-Laws" is most used during family gatherings, and even during interrogation-like conversations. Use this item before, and after, the encounter for best results. This item lasts for five encounters!`,
  imageURL:"https://static.scientificamerican.com/sciam/cache/file/F9153FF5-1150-480C-957E215D33FBBBDB_source.jpg?w=590&h=800&51EEC77F-AE6D-4B79-842220197A30C887",
  price:56,
  category:'Patience',
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

    // await Promise.all(reviews.map(review => {
    //   return Review.create(review);
    // }))
    
  } catch (error) {
    console.log(error)
  }


 

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
