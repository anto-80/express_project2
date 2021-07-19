const express = require("express");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require('path'); 
const {Restaurant,Menu,Item} = require('./models/index');



const app = express();

// setup our templating engine
const handlebars = expressHandlebars({
	handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

const port = 3000;

app.use(express.json())


app.use(express.static(path.join(__dirname, 'public')))



app.get('/items', async (req, res) => {
    
    const allItems = await Item.findAll()
    
    res.json(allItems)
})

app.get('/menus', async (req, res) => {
	let menus = await Menu.findAll()
	res.json({ menus })
})




app.get('/menu/:id', async (req, res) => {
	let menu = await Menu.findByPk(req.params.id);
	res.json({ menu })
})

app.get('/restaurant', async (req, res) => {
  const restaurants = await Restaurant.findAll()

  res.render('restaurants', {restaurants})
})

app.get('/restaurant/:id', async (req, res) => {
	let restaurant = await Restaurant.findByPk(req.params.id);
	res.render('restaurant',{ restaurant })
})


app.get('/item/:id', async (req, res) => {
	let item = await Item.findByPk(req.params.id);
	res.json({ item })
})

// add a new restaurant
app.post('/restaurant', async (req, res) => {
	let newRestaurant = await Restaurant.create(req.body);
	res.send('Created!')
})

app.post('/menu', async (req, res) => {
	let newMenu = await Menu.create(req.body);
	res.send('Created!')
})

app.post('/item', async (req, res) => {
	let newItem = await Item.create(req.body);
	res.send('Created!')
})

// Delete a menu

app.delete('/menu/:id', async (req, res) => {
	await Menu.destroy({
		where : {id : req.params.id} 
	})
	res.send("Deleted!!")
})

// Update a menu
app.put("/menu/:id", async (req, res) => {
	let updated = await Menu.update(req.body, {
		where : {id : req.params.id} 
	})
	res.send("Updated!!")
})

app.put("/item/:id", async (req, res) => {
	let updated = await Item.update(req.body, {
		where : {id : req.params.id} 
	})
	res.send("Updated!!")
})

app.put("/restaurant/:id", async (req, res) => {
	let updated = await 
	Restaurant.update(req.body, {
		where : {id : req.params.id} 
	})
	res.send("Updated!!")
})








app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
