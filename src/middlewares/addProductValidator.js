const { body } = require('express-validator');
const path = require('path')

module.exports = [
    
    body('name')
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio.')
    .bail()
    .trim()
    .isLength({min: 5})
    .withMessage('El campo debe tener al menos 5 carácteres.')
    .bail(),

    body('description')
    .notEmpty()
    .withMessage('La descripción del producto es obligatoria.')
    .bail()
    .trim()
    .isLength({min: 20, max: 500})
    .withMessage('La descripción del producto debe tener al menos 20 carácteres.')
    .bail(),

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
    })
    .bail(),

    body('image')
    .custom((value, { req }) => {
        if (!req.file) {
            return true;
        }
    
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('La imagen debe ser un archivo válido (JPG, JPEG, PNG).');
        }
    
        return true;
    })
    .bail()
]