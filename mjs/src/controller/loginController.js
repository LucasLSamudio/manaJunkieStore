const objTienda = require('../../db/logo')

const loginController = {
    index:(req, res) => {
        res.render('users/login', { 
            title: objTienda.name,
            foto: objTienda.foto
        });
    }
}

module.exports = loginController;