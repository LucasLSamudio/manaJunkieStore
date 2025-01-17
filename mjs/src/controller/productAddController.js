const objTienda = require('../../db/logo')

const productAddController = {
    index:(req, res) =>{
        res.render('products/productAdd',{
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

module.exports = productAddController;