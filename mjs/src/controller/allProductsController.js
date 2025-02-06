const objTienda = require('../../db/logo')

const homeController = {
    index:(req,res) =>{
        res.render('products/allProducts',{
            ...objTienda
        })
    }
}

module.exports = homeController