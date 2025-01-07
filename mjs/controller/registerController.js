const objTienda = require('../db/logo')

const registerController = {
    index:(req, res) => {
        res.render('register', { 
            title: objTienda.name,
            foto: objTienda.foto
        });
    }
}

module.exports = registerController;