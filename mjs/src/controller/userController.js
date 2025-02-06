const objTienda = require('../../db/logo')

const usersJson = require('../../db/users.json')

const userController = {
    login: (req, res) => {
        res.render('users/login', {
            ...objTienda
        })
    },

    register: (req, res) => {
        res.render('users/register', {
            ...objTienda
        })
    }
}

module.exports = userController;