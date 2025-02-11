const objTienda = require('../../db/logo');
const {readFile, writeFile, parseFile, stringifyFile, dataBasic} = require('../../utils/fileSystem')
const fs = require('fs');

const path = require('path')
const {toThousand, } = require('../../utils')

const productJson = require('../../db/products.json');
const categories = require('../../db/categories.json')

const productsController = {
    list:(req, res) => {
        res.render('products/allProducts', { 
            dataBasic,
            productJson,
            title: "Mana Junkie Store",
            toThousand
        });
    },

    detail: (req, res) => {
        const prod = productJson.findIndex(prod => prod.id === +req.params.id);

        return res.render('products/productDetail', {
            product: productJson[prod],
            dataBasic,
            title: prod.name,
            toThousand
        })
    },

    create: (req, res) => { // GET
        return res.render('products/productAdd',{
            ...dataBasic,
            categories,
            title: "Vender producto"
        })
    }, 

    add: (req, res) => { // POST
        const {name, price, discount, description, category} = req.body;
        let newID = productJson[productJson.length - 1].id + 1;
        const newProduct = {
            id : newID,
            name : name.trim(),
            description : description.trim(),
            price : +price,
            discount : +discount,
            image : "default-image.png",
            category
        }
        
        productJson.push(newProduct)
        
        fs.writeFileSync(path.join(__dirname, '../../db/products.json'),JSON.stringify(productJson, null, 3),'utf-8')
        console.log("Lalala "+newProduct.id);

        return res.redirect('/products/' + newProduct.id,)
    },

    edit: (req, res) => {
        const { id } = req.params;
        const prod = productJson.find(product => product.id === +id);

        return res.render('products/productEdit',{
            ...prod,
            categories,
            title: "Edición de producto",
            dataBasic
        })
    },

    delete: (req, res) => {

    },

    search: (req, res) => {
        
    }
}

module.exports = productsController;