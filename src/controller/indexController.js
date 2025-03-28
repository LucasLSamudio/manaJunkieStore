const {toThousand} = require('../utils')
const fs = require('fs')
const path = require('path')
const {Category} = require('../database/models')


const indexController = {
    index: async(req, res) =>{
        try {
            const categories = await Category.findAll({
                include: [
					{
						association : 'products',
						include : ['images'],
					}
				]
            })
            res.render('index',{
                categories,
                title: "Mana Junkie Store", 
                toThousand
            })

        } catch (error) {
            console.log(error);
            res.render('error', error)
        }
      
    }
}

module.exports = indexController;