let assert = require('assert');
let Fruit_basket = require('./fruits');

const pg = require('pg');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:3201@localhost:5432/fruitdb';
const pool = new Pool({
    connectionString
});

const fruitBasket = Fruit_basket(pool);

describe('Fruit basket', async function(){
    beforeEach(async function(){
        await fruitBasket.deleteFruits();
    })
    it('should be able to find all fruits for a fruit type', async function(){
        await fruitBasket.createNewFruit('pear', 1, 2);
        await fruitBasket.createNewFruit('banana', 2, 3);
        
        let theFruit = await fruitBasket.getFruit('banana');
        assert.deepEqual([{fruit_type: 'banana', fruit_quantity: 2, fruit_price: 3}], theFruit);
    })
    it('should be able to show total for a fruit', async function(){
        await fruitBasket.createNewFruit('pear', 5, 7);
        
        let theFruit = await fruitBasket.getFruit('pear');
        let totalPrice = theFruit[0].fruit_quantity * theFruit[0].fruit_price;
        assert.deepEqual(35, totalPrice);
    })
    it('should be able to update fruits', async function(){
        await fruitBasket.createNewFruit('pear', 1, 2);
        
        let theFruit = await fruitBasket.getFruit('pear');
        assert.deepEqual([{fruit_type: 'pear', fruit_quantity: 1, fruit_price: 2}], theFruit);
    })
    it('should be able to show sum for a fruit', async function(){
        await fruitBasket.createNewFruit('pear', 3, 2);
        
        let theFruit = await fruitBasket.getFruit('pear');
        assert.deepEqual(3, theFruit[0].fruit_quantity);
    })
    it('should be able to reset the database', async function(){
        await fruitBasket.createNewFruit('pear', 3, 2);
        await fruitBasket.createNewFruit('banana', 1, 4);
        await fruitBasket.createNewFruit('orange', 4, 2);

        await fruitBasket.deleteFruits();

        assert.deepEqual([],await fruitBasket.getFruit('pear'));
        assert.deepEqual([],await fruitBasket.getFruit('banana'));
        assert.deepEqual([],await fruitBasket.getFruit('orange'));
    })
})
