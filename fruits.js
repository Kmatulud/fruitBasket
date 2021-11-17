module.exports = function Fruit_basket(pool){
    async function createNewFruit(type, qty, price){
        try {
            let fruit = await pool.query('select * from fruit_basket where fruit_type = $1', [type]);
            if (fruit.rows.length === 0){
                await pool.query(
                    'insert into fruit_basket(fruit_type, fruit_quantity, fruit_price) values ($1, $2, $3)',[type, qty, price]
                )
            }
        } catch (error) {
           console.log(error) 
        } 
    }
    async function getFruit(fruitType){
        let fruits = await pool.query('select fruit_quantity, fruit_type, fruit_price from fruit_basket where fruit_type = $1', [fruitType]);
        return fruits.rows;
    }
    async function updateFruits(fruit, type){
        let theFruit = await pool.query(
            'update fruit_basket set fruit_quantity = $1 where fruit_type = $2', [fruit, type]
        );
        return theFruit.rows;
    }
    async function deleteFruits(){
        await pool.query('delete from fruit_basket');
    }
    return{
        createNewFruit,
        getFruit,
        updateFruits,
        deleteFruits
    };
}