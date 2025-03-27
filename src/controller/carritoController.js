const {toThousand} = require('../utils')

const carritoController = {
    index:(req, res) => {
        const productJson = require('../db/products.json');
        const prod = productJson[0];
        res.render('cart/carrito',{
            prod,
            title: "Carrito",
            toThousand
        })
    }
}

module.exports = carritoController;