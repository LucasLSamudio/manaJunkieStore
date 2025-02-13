const {toThousand, dataBasic} = require('../../utils')

const carritoController = {
    index:(req, res) => {
        const productJson = require('../../db/products.json');
        const prod = productJson[0];
        res.render('cart/carrito',{
            prod,
            title: prod.name,
            toThousand
        })
    }
}

module.exports = carritoController;