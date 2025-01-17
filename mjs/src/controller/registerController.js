const objTienda = require('../../db/logo')

const registerController = {
    index:(req, res) => {
        res.render('users/register', { 
            title: objTienda.name,
            foto: objTienda.foto,
            index: objTienda.index,
            login: objTienda.login,
            register: objTienda.register,
            carrito: objTienda.carrito,
            productAdd: objTienda.productAdd,
            productDetail: objTienda.productDetail,
            productEdit: objTienda.productEdit
        });
    }
}

module.exports = registerController;