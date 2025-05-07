const { body } = require('express-validator');
const { User } = require('../../database/models/user')

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
    .withMessage('Debe de ingresar un email válido.')
    .bail()
    .custom(async (value) => {
        const user = await User.findOne({
            where: { email: value }
        });
        
        if (user) {
            throw new Error('Este email ya está registrado');
        }
        
        return true;
    })
    .bail(),
    
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
    .withMessage('La contraseña debe tener al menos un carácter especial.')
    .bail(),
    
    body('phone')
    .notEmpty()
    .withMessage('El campo no debe estar vacío.')
    .bail()
    .isNumeric()
    .withMessage('Tiene que ser un número de teléfono válido.')
    .bail()

]