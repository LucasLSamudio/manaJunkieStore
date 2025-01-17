const objTienda = require('../../db/logo')

const homeController = {
    index:(req,res) =>{
        res.render('home',{
            title: objTienda.name,
            foto: objTienda.foto
        })
    }
}

module.exports = homeController