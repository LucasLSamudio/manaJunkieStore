const objTienda = require('../../db/logo');

const carritoController = {
    index:(req, res) => {
        res.render('cart/carrito',{
            ...objTienda
        })
    }
}

module.exports = carritoController;