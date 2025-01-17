const objTienda = require('../../db/logo')

const productEditController = {
    index:(req, res) =>{
        res.render('products/productEdit',{
            title: objTienda.name,
            foto: objTienda.foto,
            carousel: objTienda.carousel,
            index: objTienda.index,
            login: objTienda.login,
            register: objTienda.register,
            carrito: objTienda.carrito,
            productAdd: objTienda.productAdd,
            productDetail: objTienda.productDetail,
            productEdit: objTienda.productEdit
        })
    }
}

module.exports = productEditController;