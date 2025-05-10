const { body } = require('express-validator');

module.exports = [
    
    body('name')
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio.')
    .bail()
    .trim()
    .isLength({min: 5})
    .withMessage('El campo debe tener al menos 5 carácteres.'),

    body('price')
    .notEmpty()
    .withMessage('El precio del producto es obligatorio.')
    .bail()
    .isInt()
    .withMessage('Debe ingresar el precio en números, no se permiten letras.')
    .bail()
    .isLength({min: 3})
    .withMessage('El campo debe tener al menos 3 carácteres.'),

    body('category')
    .notEmpty()
    .withMessage('Es obligatorio elegir una categoría.')
    .bail()
    .custom(value => {
        const categoriasValidas = [1, 2, 3, 4, 5, 6];
        if (!categoriasValidas.includes(parseInt(value))) {
            throw new Error('La categoría seleccionada no es válida.');
        }
        return true;
    }),

    body('discount')
    .isNumeric()
    .withMessage("Debe ingresar un número, no se permiten letras.")
    .bail()
    .isLength({ max: 2 })
    .withMessage("No puede tener más del 99% de descuento."),

    body('description')
    .notEmpty()
    .withMessage('La descripción del producto es obligatoria.')
    .bail()
    .trim()
    .isLength({min: 20})
    .withMessage('La descripción del producto debe tener al menos 20 carácteres.')
    .bail()
    .isLength({max:500})
    .withMessage('La descripción del producto no puede superar los 500 carácteres.'),
        
    body('existFile')
    .custom(value => {
        if(!value){
            throw new Error('Debe subir por lo menos una imagen.')
        }
        return true;
    })
]