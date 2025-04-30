const { toThousand } = require("../utils");
const fs = require("fs");
const path = require("path");

const { Product, Category } = require("../database/models");

const adminController = {
    index: async (req, res) => {
        try {

            const [products, categories] = await Promise.all([
                Product.findAll({
                    include : ['images', 'category'] 
                }),
                Category.findAll(),
            ]);
            
            return res.render("admin", {
                products,
                categories,
                title: "Mana Junkie Store",
                toThousand,
            });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = adminController;
