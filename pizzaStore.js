module.exports = function  pizzaCart() {
	let smallPizza = 0;
	let smallUnit = 0;
	let mediumPizza = 0;
	let mediumUnit = 0;
	let largePizza = 0;
	let largeUnit = 0;
	let storeOrders = [];
	let currentOrder;

	let errorMessage = '';

	// Order samples 
	const data = [
		{
			status : 'Payment due',
			amount : 63.98,
			items : 2
		},
		{
			status : 'Payment due',
			amount : 58.99,
			items : 1
		},
		{
			status : 'Payment due',
			amount : 175.98,
			items : 2
		},
		{
			status : 'Payment due',
			amount : 149.97,
			items : 3
		},
		{
			status : 'Payment due',
			amount : 266.96,
			items : 4
		}
	];

	function buyPizza(unit) {
		if (unit == 'small') {
			smallPizza += 31.99;
			smallUnit += 1;

		} else if (unit == 'medium') {
			mediumPizza += 58.99;
			mediumUnit += 1;

		} else if (unit == 'large') {
			largePizza += 87.99;
			largeUnit += 1;

		}
	}

	function getPizza() {
		return {
			strSmall: smallPizza.toFixed(2),
			strSmallUnit: smallUnit,
			strMedium: mediumPizza.toFixed(2),
			strMediumUnit: mediumUnit,
			strLarge: largePizza.toFixed(2),
			strLargeUnit: largeUnit
		};
	}

	function addTotal() {
		let strTotalCost = smallPizza + mediumPizza + largePizza;
		let strTotalUnit = smallUnit + mediumUnit + largeUnit;

		return {
			totalCost: strTotalCost.toFixed(2),
			totalUnit: strTotalUnit
		};
	}

	function makeOrder() {
		let orderNo = storeOrders.length;
		let total = addTotal();
		let allOrders = getData();


		// for (const order of allOrders) {
		// if (allOrders.amount !== 0) {
		// 	currentOrder = {
		// 		orderId : orderNo += 1,
		// 		status : order.status,
		// 		amount : order.amount,
		// 		items : order.items
    
		// 	};
    
		// 	storeOrders.push(currentOrder);
            
		// }

		if (total.totalUnit !== 0) {
			currentOrder = {
				orderId : orderNo += 1,
				status : 'Payment due',
				amount : total.totalCost,
				items : total.totalUnit

			};

			storeOrders.push(currentOrder);
			errorMessage = '';
    
			orderMade();
		} else {
			errorMessage = 'Add atleast 1 item in the Cart';
		}
	}

	function orderMade() {
		smallPizza = 0;
		smallUnit = 0;
		mediumPizza = 0;
		mediumUnit = 0;
		largePizza = 0;
		largeUnit = 0;
        
	}

	function getOrders() {
		return storeOrders;

	}

	function yourOrder() {
		return currentOrder;
        
	}

	function getData() {
		return data;
	}

	function getError() {
		return errorMessage;
	}

	return {
		buyPizza,
		getPizza,
		addTotal,
		makeOrder,
		orderMade,
		getOrders,
		yourOrder,
		getData,
		getError
	};
};