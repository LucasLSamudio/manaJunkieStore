const {toThousand} = require('../utils')
const fs = require('fs');
const path = require('path');

const adminController  = {
    index:(req,res) =>{
        const products = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/products.json'),'utf-8'))
        const categories = require('../db/categories.json')
        res.render('admin',{
            categories,
            products,
            toThousand
        })
    }
}

module.exports = adminController