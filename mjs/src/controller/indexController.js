const objTienda = require('../../db/logo')

const indexController = {
    index:(req, res) =>{
        res.render('index',{
            title: objTienda.name,
            foto: objTienda.foto,
            carousel: objTienda.carousel,
            index: objTienda.index,
            login: objTienda.login,
            register: objTienda.register,
            carrito: objTienda.carrito,
            productAdd: objTienda.productAdd,
            productDetail: objTienda.productDetail,
            productEdit: objTienda.productEdit,
            img1: objTienda.img1,
            img2: objTienda.img2,
            img3: objTienda.img3,
            img4: objTienda.img4,
            img5: objTienda.img5
        })
    }
}

module.exports = indexController;