const objTienda = require('../../db/logo')
const { v4: uuidv4, validate } = require('uuid'); // id : uuidv4(),
const bcrypt = require('bcrypt'); // password : bcrypt.hashSync(password, 10)  |  const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))

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