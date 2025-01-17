const objTienda = require('../../db/logo')

const indexController = {
    index:(req, res) =>{
        res.render('index',{
            title: objTienda.name,
            foto: objTienda.foto,
            carousel: objTienda.carousel
        })
    }
}

module.exports = indexController;