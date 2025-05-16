const { body } = require('express-validator');

module.exports = [
    body('firstName')
    .notEmpty()
    .withMessage('El nombre es obligatorio.')
    .bail()
    .trim()
    .isLength({min: 2})
    .withMessage('El campo debe tener al menos 2 carácteres.')
    .bail(),

    body('lastName')
    .notEmpty()
    .withMessage('El apellido es obligatorio.')
    .bail()
    .trim()
    .isLength({min: 2})
    .withMessage('El campo debe tener al menos 2 carácteres.')
    .bail(),

    body('email')
    .notEmpty()
    .withMessage('El campo no puede estar vacio.')
    .bail()
    .isEmail()
    .withMessage('Debe de ingresar un email válido.'),

    body('password')
    .notEmpty()
    .withMessage('El campo no puede estar vacío.')
    .bail()
    .isLength({ min: 8, max: 20})
    .withMessage('La contraseña debe tener al menos 8 caracteres y un máximo de 20.')
    .bail()
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe tener al menos una letra mayúscula.')
    .matches(/[a-z]/)
    .withMessage('La contraseña debe tener al menos una letra minúscula.')
    .matches(/\d/)
    .withMessage('La contraseña debe tener al menos un número.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('La contraseña debe tener al menos un carácter especial.'),

    body('password2')
    .notEmpty()
    .withMessage('El campo no puede estar vacío.')
    .bail()
    .isLength({ min: 8, max: 20})
    .withMessage('La contraseña debe tener al menos 8 caracteres y un máximo de 20.')
    .bail()
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe tener al menos una letra mayúscula.')
    .matches(/[a-z]/)
    .withMessage('La contraseña debe tener al menos una letra minúscula.')
    .matches(/\d/)
    .withMessage('La contraseña debe tener al menos un número.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('La contraseña debe tener al menos un carácter especial.'),

    // TO DO: Custom para que valide que password coincida con password2
    
    body('phone')
    .notEmpty()
    .withMessage('El campo no debe estar vacío.')
    .bail()
    .isNumeric()
    .withMessage('Tiene que ser un número de teléfono válido.')
    .bail()
    .isLength({min:10, max:10})
    .withMessage('El número de teléfono debe ser de 10 dígitos, incluyendo el código de área.')

]