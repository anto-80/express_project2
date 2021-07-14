const express = require("express");
const path = require('path'); //a node native module
const {Item} = require('./models/index');
const {Restaurant} = require('./models/Restaurant');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')))



app.get('/items', async (req, res) => {
    //goes into the database and looks for all Items
    const allItems = await Item.findAll()
    //server will respond with all the items found in the database
    res.json(allItems)
})



app.get('/randomItem', async (req, res) => {
    const randomNum = Math.floor(Math.random() * 3)
    const randomItem = await Item.findByPk(randomNum)

    res.json(randomItem)
})


app.get('/flipcoin', (req, res) => {
 

 const coinflip = !Math.floor(Math.random() * 2) ? 'Heads' : 'Tails' 
  res.send(coinflip)
})


app.get('/restaurants', async (req, res) => {
  const allRestaurants = await Restaurant.findAll()

  res.json(allRestaurants)
})


//Q: What will our server be doing?
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
