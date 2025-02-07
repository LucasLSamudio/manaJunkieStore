const objTienda = require('../../db/logo');
const {readFile, writeFile, parseFile, stringifyFile, dataBasic} = require('../../utils/fileSystem')

const path = require('path')
const {toThousand, } = require('../../utils')

const productJson = require('../../db/products.json');

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
        console.log(productJson[prod].discount);
        
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
            title: "Vender producto"
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