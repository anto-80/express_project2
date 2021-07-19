const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index') 



const seedRestaurant = [
  {
    name: 'AppleBees',
    location: 'Texas',
    cuisine: 'FastFood',
    image: 'https://www.fsrmagazine.com/sites/default/files/styles/homepage_carousel_2x_640x476/public/story-images/applebees-brings-back-all-you-can-eat-favorite.jpg?itok=9GzimNWs'
  },
  {
    name: 'LittleSheep',
    location: 'Dallas',
    cuisine: 'Hotpot',
    image: 'https://franchiseconduit.com/wp-content/uploads/2019/04/image_5dec8c86148b02b0_md.jpg'
  },
  {
    name: 'Spice Grill',
    location: 'Houston',
    cuisine: 'Indian',
    image: 'https://spicegrillparsippany.com/wp-content/uploads/2019/06/parsippany_gallery1.jpg'
  },
  {
    name: 'burger king',
    location: 'Dallas',
    cuisine: 'Hotpot',
    image: 'https://uploads.dailydot.com/2021/06/burger-king-table.jpg?auto=compress%2Cformat&ixlib=php-3.3.0'
  },
  {
    name: 'MCDS',
    location: 'Dallas',
    cuisine: 'Hotpot',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/f6/2f/e7/our-wall-of-some-of-the.jpg'
  },
]
const seedMenu = [
  {
    title: 'Breakfast',
    RestaurantId : 1,
  },
  {
    title: 'Lunch',
    RestaurantId : 2,
  },
  {
    title: 'Dinner',
    RestaurantId : 3,
  },
]
const seedItem = [
  {
    name: 'bhindi masala',
    image: 'someimage.jpg',
    price: 9.50,
    vegetarian: true,
    MenuId : 3,
  },
  {
    name: 'egusi soup',
    image: 'someimage.jpg',
    price: 10.50,
    vegetarian: false,
    MenuId : 2,
  },
  {
    name: 'hamburger',
    image: 'someimage.jpg',
    price: 6.50,
    vegetarian: false,
    MenuId : 1,
  }
]




const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Restaurant.bulkCreate(seedRestaurant, {validate: true})
    await Menu.bulkCreate(seedMenu, {validate: true})
    await Item.bulkCreate(seedItem, {validate: true})
    console.log('Seeding success!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}


seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
    })
