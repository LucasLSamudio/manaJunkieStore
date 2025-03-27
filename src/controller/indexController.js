const {toThousand} = require('../utils')
const fs = require('fs')
const path = require('path')


const indexController = {
    index:(req, res) =>{
        JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));
        const productJson = require('../db/products.json');
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