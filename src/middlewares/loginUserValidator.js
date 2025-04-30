const { body } = require('express-validator');
const { User } = require('../database/models/user')
const bcrypt = require('bcrypt');

module.exports = [
    body('email')
    .notEmpty()
    .withMessage('El campo no puede estar vacio.')
    .bail()
    .isEmail()
    .withMessage('Debe de ingresar un email válido.')
    .bail()
    .custom(async (value, {req}) => {
        const user = await User.findOne({ where: { value: req.body.email } });

    if (!user) {
        throw new Error('Email incorrecto. Verifique su email.');
    }
    }),

    body('password')
    .notEmpty()
    .withMessage('El campo no puede estar vacío.')
    .bail()
    .custom(async (value, { req }) => {
        const user = await User.findOne({ where: { email: req.body.email } });
    
        const pwHashed = bcrypt.compareSync(value, user.password);
    
        if (!pwHashed) {
            throw new Error('Contraseña incorrecta. Ingrese nuevamente su contraseña.');
        } 
    
        return true;
    })
]