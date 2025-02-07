const objTienda = require('../../db/logo');
const {readFile, writeFile, parseFile, stringifyFile, dataBasic} = require('../../utils/fileSystem')

const path = require('path')
const {toThousand, } = require('../../utils')

const productJson = require('../../db/products.json');


const indexController = {
    index:(req, res) =>{
        console.log(...productJson);
        prod = productJson[9]
        prod2 = productJson[15]
        res.render('index',{
            dataBasic,
            prod,
            prod2,
            title: "Mana Junkie Store", 
            toThousand
        })
    }
}

module.exports = indexController;