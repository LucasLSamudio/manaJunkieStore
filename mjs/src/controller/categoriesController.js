const categories = require('../../db/categories.json');

const categoriesController = {
    index:(req, res) => {
        res.render('products/categories',{
            categories,
            title: "Categorias"
        })
    }
}

module.exports = categoriesController;