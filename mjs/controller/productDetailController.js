const objTienda = require('../db/logo')

const productDetailController={
    index:(req, res) => {
        res.render('productDetail', { 
            title: objTienda.name,
            foto: objTienda.foto
        });
    }
}

module.exports = productDetailController;