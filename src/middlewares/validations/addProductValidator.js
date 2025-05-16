const { body } = require('express-validator');
const { MEDIUMINT } = require('sequelize');

module.exports = [
    
    body('name')
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio.')
    .bail()
    .trim()
    .isLength({min: 5})
    .withMessage('El nombre debe tener al menos 5 carácteres.')
    .bail()
    .isLength({max: 100})
    .withMessage('El nombre no debe superar los 100 carácteres.'),

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
    .custom(value => {
        if (value === null || value === '') {
            return true;
        }

        const number = +value

        if(isNaN(number)){
            throw new Error('El descuento debe estar en números.')
        }
        if(number < 0 ){
            throw new Error('El descuento no puede ser negativo.')
        }
        if(number > 90){
            throw new Error('El descuento no puede ser más del 90%.')
        }

        return true;
    }),
    
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