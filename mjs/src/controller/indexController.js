const objTienda = require('../../db/logo')
const partialJson = require('../../utils/fileSystem')

const indexController = {
    index:(req, res) =>{
        res.render('index',{
            ...objTienda
        })
    }
}

module.exports = indexController;