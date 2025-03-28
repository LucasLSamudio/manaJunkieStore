const fs = require('fs');
const path = require('path')
const {toThousand, } = require('../utils')
const {Product} = require('../database/models')

const categories = require('../db/categories.json')

const productsController = {
    list: async (req, res) => {
        try {
            const products = await Product.findAll({
                include : ['images']
            })
            res.render('products/allProducts', { 
                products,
                title: "Mana Junkie Store",
                toThousand
            });
        } catch (error) {
            console.log(error);
        }
        
    },
    
    detail: async (req, res) => {

        try {
            const product = await Product.findByPk(req.params.id,{
                include : ['images']
            })

            return res.render('products/productDetail', {
                product,
                title: product.name,
                toThousand
            })
        } catch (error) {
            console.log(error);
            
        }
    
    },
    
    create: (req, res) => { // GET
        return res.render('products/productAdd',{
            categories,
            title: "Vender producto"
        })
    }, 
    
    add: (req, res) => { // POST
        const productJson = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/products.json'),'utf-8'))
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
        fs.writeFileSync(path.join(__dirname, '../db/products.json'),JSON.stringify(productJson, null, 3),'utf-8')

        return res.redirect('/products/' + newProduct.id,)
    },

    edit: (req, res) => {
        const productJson = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/products.json'),'utf-8'));
        const { id } = req.params;
        const prod = productJson.find(product => product.id === +id);

        return res.render('products/productEdit',{
            ...prod,
            categories,
            title: "Edición de producto",
        })
    },

    update: (req, res) => {
        const productJson = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/products.json'),'utf-8'));
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
    
        fs.writeFileSync(path.join(__dirname, '../db/products.json'),JSON.stringify(productModify, null, 2),'utf-8');
    
        return res.redirect('/admin');
    },
    
    
    delete: (req, res) => {
        const productJson = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/products.json'),'utf-8'));
        const {id} = req.params;

        const newArray = productJson.filter(prod => prod.id !== +id);
        fs.writeFileSync(path.join(__dirname,'../db/products.json'),JSON.stringify(newArray,null,2),'utf-8')
        return res.redirect('/admin?remove=true');
    },

    search: (req, res) => {

    }
}

module.exports = productsController;