const objTienda = require('../../db/logo')

const productEditController = {
    index:(req, res) =>{
        res.render('products/productEdit',{
            title: objTienda.name,
            foto: objTienda.foto,
            carousel: objTienda.carousel
        })
    }
}

module.exports = productEditController;