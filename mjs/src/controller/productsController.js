const fs = require('fs');
const path = require('path')

const {toThousand, dataBasic} = require('../../utils')

// const productJson = require('../../db/products.json');
const categories = require('../../db/categories.json')

const productsController = {
    list:(req, res) => {
        const productJson = require('../../db/products.json');
        res.render('products/allProducts', { 
            dataBasic,
            productJson,
            title: "Mana Junkie Store",
            toThousand
        });
    },

    detail: (req, res) => {
        const productJson = require('../../db/products.json');
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

        return res.redirect('/products/' + newProduct.id,)
    },

    edit: (req, res) => {
        const productJson = require('../../db/products.json');
        const { id } = req.params;
        const prod = productJson.find(product => product.id === +id);

        return res.render('products/productEdit',{
            ...prod,
            categories,
            title: "Edición de producto",
            dataBasic
        })
    },

    update: (req, res) => {
        const productJson = require('../../db/products.json');
        const { name, price, discount, description, category } = req.body;
    
        const productModify = productJson.map(prod => {
            if (prod.id === +req.params.id) {
                prod.name = name.trim();
                prod.price = +price;
                prod.discount = +discount;
                prod.description = description.trim();
                prod.category = category;
            }
            return prod;
        });
    
        fs.writeFileSync(path.join(__dirname, '../../db/products.json'),JSON.stringify(productModify, null, 2),'utf-8');
    
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        // await delay(500);
    
        return res.redirect('/products');
    },
    
    
    delete: (req, res) => {
        const productJson = require('../../db/products.json');
        const {id} = req.params;

        const newArray = productJson.filter(prod => prod.id !== id);
        fs.writeFileSync(path.join(__dirname,'../../db/products.json'),JSON.stringify(newArray,null,2),'utf-8')
        return res.redirect('/products');
    },

    search: (req, res) => {

    }
}

module.exports = productsController;