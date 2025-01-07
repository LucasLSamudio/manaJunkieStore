const objTienda = require('../db/logo')

const loginController = {
    index:(req, res) => {
        res.render('login', { 
            title: objTienda.name,
            foto: objTienda.foto
        });
    }
}

module.exports = loginController;