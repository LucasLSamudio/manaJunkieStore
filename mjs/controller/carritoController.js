const objTienda = require('../db/logo');

const carritoController = {
    index:(req, res) => {
        res.render('carrito',{
            title: objTienda.name,
            foto: objTienda.foto
        })
    }
}

module.exports = carritoController;