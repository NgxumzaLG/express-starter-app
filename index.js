const express = require('express');
const exphbs  = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');

const pizzaStore = require('./pizzaStore');
const pizzaCart = pizzaStore();

const app = express();
const PORT =  process.env.PORT || 3017;

// initialise session middleware - flash-express depends on it
app.use(session({
	secret : 'success and error messages',
	resave: false,
	saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

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

	let checkError = pizzaCart.getError();

	if ( checkError === '') {
		res.render('orderSummary', {
			theOrder: pizzaCart.yourOrder()
		});

	} else {
		req.flash('error', 'Add atleast 1 item in the Cart');
		res.redirect('/');
	}


	// console.log(pizzaCart.getOrders());

	
});

app.get('/orders', function(req, res) {
	// pizzaCart.makeOrder();
	// console.log(pizzaCart.getOrders());

	res.render('orders', {
		orderList: pizzaCart.getOrders()
	});
});

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`);
});