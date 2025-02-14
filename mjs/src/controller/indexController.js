const {toThousand} = require('../../utils')
// const path = require('path')


const indexController = {
    index:(req, res) =>{
        const productJson = require('../../db/products.json');
        console.log(...productJson);
        prod = productJson[9]
        prod2 = productJson[15]
        res.render('index',{
            prod,
            prod2,
            title: "Mana Junkie Store", 
            toThousand
        })
    }
}

module.exports = indexController;