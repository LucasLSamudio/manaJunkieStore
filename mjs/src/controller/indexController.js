const {toThousand} = require('../utils')


const indexController = {
    index:(req, res) =>{
        console.log("Log del res.locals.usuarioLogueado:\n",res.locals.usuarioLogueado);
        console.log("Log del res.cookie:\n",res.cookie);

        const productJson = require('../db/products.json');
        prod = productJson[9]
        prod2 = productJson[15]
        res.render('index',{
            prod,
            prod2,
            title: "Mana Junkie Store", 
            toThousand
        })
    }
}

module.exports = indexController;