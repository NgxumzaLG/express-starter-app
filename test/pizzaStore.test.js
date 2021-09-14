let assert = require("assert");
let pizzaStore = require('../pizzaStore');

describe('Zandy Pizza', function () {
    describe('Buy a pizza', function() {
        it('It should be able to buy small pizza', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('small');

            assert.deepEqual({ largePizza: 0,
                                largeUnit: 0,
                                mediumPizza: 0,
                                mediumUnit: 0,
                                smallPizza: 31.99,
                                smallUnit: 1 }, pizzaCart.getPizza());
        });

        it('It should be able to buy medium pizza', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('medium');

            assert.deepEqual({ largePizza: 0, 
                                largeUnit: 0,
                                mediumPizza: 58.99,
                                mediumUnit: 1,
                                smallPizza: 0,
                                smallUnit: 0 }, pizzaCart.getPizza());
        });

        it('It should be able to buy large pizza', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('large');

            assert.deepEqual({ largePizza: 87.99,
                                largeUnit: 1,
                                mediumPizza: 0,
                                mediumUnit: 0,
                                smallPizza: 0,
                                smallUnit: 0 }, pizzaCart.getPizza());
        });
    });

    describe('Add totals', function () {
        it('it should be able to add the totals', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('large');
            pizzaCart.buyPizza('large');
            pizzaCart.buyPizza('small');

            assert.deepEqual({ totalCost: 207.97,
                                totalUnit: 3 }, pizzaCart.addTotal());
        });

        it('it should be able to add the totals', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('small');
            pizzaCart.buyPizza('medium');

            assert.deepEqual({ totalCost: 90.98,
                                totalUnit: 2 }, pizzaCart.addTotal())
        });
    });

    describe('Make orders', function () {
        it('it should be able to make an order', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('small');

            pizzaCart.makeOrder();

            assert.deepEqual([{ amount: 31.99,
                                items: 1,
                                orderId: 1,
                                status: "Payment due" }], pizzaCart.getOrders());
        });

        it('it should be able to make an order', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('small');
            pizzaCart.buyPizza('medium');
            pizzaCart.buyPizza('large');

            pizzaCart.makeOrder();

            assert.deepEqual([{ amount: 178.97,
                                items: 3,
                                orderId: 1,
                                status: "Payment due" }], pizzaCart.getOrders());
        });

        it('it should be able to make 2 orders or more', function () {
            let pizzaCart = pizzaStore();

            pizzaCart.buyPizza('small');
            pizzaCart.buyPizza('large');

            pizzaCart.makeOrder();

            pizzaCart.buyPizza('large');
            pizzaCart.buyPizza('large');

            pizzaCart.makeOrder();

            assert.deepEqual([{ amount: 119.98,
                                items: 2,
                                orderId: 1,
                                status: "Payment due" },

                            { amount: 175.98,
                                items: 2,
                                orderId: 2,
                                status: "Payment due" }], pizzaCart.getOrders());
        });
    });


});