const productJson = require('../../db/products.json');
const {toThousand, } = require('../../utils')

const carritoController = {
    index:(req, res) => {
        const prod = productJson[0];
        res.render('cart/carrito',{
            prod,
            title: prod.name,
            toThousand
        })
    }
}

module.exports = carritoController;