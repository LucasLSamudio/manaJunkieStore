const fs = require('fs');
const path = require('path')
const {toThousand } = require('../utils')
const {Product, Category, ImageProduct} = require('../database/models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

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
            
            const relationalProducts = await Product.findAll({
                where : {
                    idCategory : product.idCategory,
                    id : {[Op.not]: product.id}
                },
                include : ['images']
            })

            return res.render('products/productDetail', {
                product,
                title: product.name,
                relationalProducts,
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
        // return res.send(req.body)
        try {
            const {name, price, discount, description, category} = req.body;

            const errors = validationResult(req);
            console.log('Log de errors:\n\n',errors);
            console.log('Log de req.body:\n\n',req.body);
            console.log('Log de name, price:\n\n',name, price);
            if (!errors.isEmpty()) {
                // Si hay errores, deberías volver al formulario con los errores y los datos viejos
                const categories = await Category.findAll();
                return res.render('products/productAdd', {
                    errors: errors.mapped(),
                    oldData: req.body,
                    categories,
                    title: "Vender producto"
                });
            }
            const product = await Product.create({
                name : name.trim(),
                description : description.trim(),
                price,
                discount,
                idCategory : category
            })
            

            if(req.files.length) {
                req.files.forEach(async (file) => {
                    await ImageProduct.create({
                        name : file.filename,
                        idProduct : product.id
                    })
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
            const {id} = req.params;path
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
                        id
                    }
                }
            )

            // si cargo imagenes en el input tipo file
            if(req.files.length){
                // obtengo las imágenes de la base de datos
                const images = await ImageProduct.findAll({
                    where : {
                        idProduct : id
                    }
                });
                // elimino los archivos (físicos)
                images.forEach(image => {
                    const pathFile = path.join(__dirname,`../../public/images/products/${image.name}`)
                    fs.existsSync(pathFile) && fs.unlinkSync(pathFile)
                });

                // elimino los registros de las imágenes asociadas al producto
                await ImageProduct.destroy({
                    where :{
                        idProduct : id
                    }
                });

                // agrego las 'nuevas' imágenes
                req.files.forEach(async (file) => {
                    await ImageProduct.create({
                        name : file.filename,
                        idProduct : id
                    })
                });
            }

            return res.redirect('/admin');
            
        } catch (error) {
            console.log(error);
            
        }
    
    },
    
    
    delete: async (req, res) => { // Method DELETE
        // console.log(error);
        try {

            const {id} = req.params;

            await ImageProduct.destroy({
                where: { idProduct: id }
            });
            await Product.destroy({
                where : { id : id }
            });
            // TODO: eliminar las imágenes asociadas
            return res.redirect('/admin?remove=true');

        } catch (error) {
            console.log(error);
        }

    },

    search: (req, res) => {

    }
}

module.exports = productsController;