const fs = require('fs');
const path = require('path')
const {toThousand, } = require('../utils')
const {Product, Category} = require('../database/models')

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
    
    create: async (req, res) => { // GET
        
        try {
            const categories = await Category.findAll();

            return res.render('products/productAdd',{
                categories,
                title: "Vender producto"
            })

        } catch (error) {
            console.log(error);
        }
        
    }, 
    
    add: async (req, res) => { // POST

        try {
            const {name, price, discount, description, category} = req.body;

            const product = await Product.create({
                name : name.trim(),
                description : description.trim(),
                price,
                discount,
                idCategory : category
            })

            if(req.file) {
                await ImageProduct.create({
                    name : req.file.filename,
                    idProduct : product.id
                })
            }

            return res.redirect('/admin')

        } catch (error) {
            console.log(error);
        }
    },

    edit: async (req, res) => {

        try {
            const { id } = req.params;

            const [product, categories] = await Promise.all([
                Product.findByPk(id,{
                    include : ['images', 'category'] 
                }),
                Category.findAll(),
            ]);

            return res.render("products/productEdit", {
                ...product.dataValues,
                categories,
                title: "Edición de producto",
                toThousand,
            });

        } catch (error) {
            console.log(error);   
        }
    },

    update: async (req, res) => {

        try {
            const {name, price, discount, description, category} = req.body;

            await Product.update(
                {
                    name : name.trim(),
                    description : description.trim(),
                    price,
                    discount,
                    idCategory : category
                },
                {
                    where : {
                        id : req.params.id
                    }
                }
            )
            return res.redirect('/admin');
            
        } catch (error) {
            console.log(error);
            
        }
    
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