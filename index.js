const express = require('express');
const exphbs  = require('express-handlebars');

const pizzaStore = require('./pizzaStore');
const pizzaCart = pizzaStore();

const app = express();
const PORT =  process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
	res.render('index', {
		costs: pizzaCart.getPizza(),
		totals: pizzaCart.addTotal()
	});
});

app.get('/buy/:pizzaType', function(req, res) {
	const pizzaType = req.params.pizzaType;
	pizzaCart.buyPizza(pizzaType);

	// console.log(pizzaCart.getPizza());

	res.redirect('/');
});

app.post('/order', function(req, res) {
	pizzaCart.makeOrder();

	// console.log(pizzaCart.getOrders());

	res.render('orderSummary', {
		theOrder: pizzaCart.yourOrder()
	});
});

app.get('/orders', function(req, res) {

	res.render('orders', {
		orderList: pizzaCart.getOrders()
	});
});

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});