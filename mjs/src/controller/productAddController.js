const objTienda = require('../../db/logo')

const productAddController = {
    index:(req, res) =>{
        res.render('products/productAdd',{
            title: objTienda.name,
            foto: objTienda.foto,
            carousel: objTienda.carousel
        })
    }
}

module.exports = productAddController;