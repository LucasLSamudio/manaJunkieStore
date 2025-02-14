const { v4: uuidv4, validate } = require('uuid'); // id : uuidv4(),
const bcrypt = require('bcrypt'); // password : bcrypt.hashSync(password, 10)  |  const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))

const usersJson = require('../../db/users.json');
const { dataBasic } = require('../../utils');

const userController = {
    login: (req, res) => {
        res.render('users/login', {
            dataBasic,
            title: "Iniciar Sesión"
        })
    },

    register: (req, res) => {
        res.render('users/register', {
            dataBasic,
            title: "Registrarse"
        })
    }
}

module.exports = userController;