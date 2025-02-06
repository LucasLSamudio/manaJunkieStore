const objTienda = require('../../db/logo');
const fs = require('fs')
const partialJson = require('../../utils/fileSystem')

const path = require('path')
const {toThousand} = require('../../utils')

const productJson = require('../../db/products.json');
const { stringify } = require('querystring');

const productsController = {
    list:(req, res) => {
        res.render('products/allProducts', { 
            ...productJson,
            ...objTienda
        });
    },

    detail: (req, res) => {
        const product = productJson.find(prod => prod.id === +req.params.id);

        return res.render('products/productDetail', {
            ...objTienda,
            ...product
        })
    },

    create: (req, res) => { // GET
        return res.render('products/productAdd',{
            ...objTienda
            // title: "lalala"
        })
    }, 

    add: (req, res) => { // POST
        let info = req.body;
        return res.send(info, {
            ...objTienda,
            title: "lalala"
        })
        // let agregarProd = JSON.parse(fs.readFileSync[productJson]);
        
        // const newProduct = {
        //     id: req.params.id,
        //     name: req.params.name,
        //     description: req.params.description,
        //     image: req.params.image,
        //     category: req.params.category,
        //     price: req.params.price,
        //     discount: req.params.discount,
        // }
        // agregarProd.push(newProduct);
        // fs.writeFileSync(productJson.stringify(agregarProd, null, 2))
        
        // res.redirect('products/productAdd',{
        //     title: "lalala"
        // })
    },

    edit: (req, res) => {

    },

    delete: (req, res) => {

    }
}

module.exports = productsController;