const fs = require('fs');
const { productDetail } = require('../db/logo');

const readFile = (pathFile) => {
    return fs.readFileSync(pathFile, "utf-8");
};

const writeFile = (pathFile,data) => {
    return fs.writeFileSync(pathFile, data, "utf-8");
};

const parseFile = (json) => {
    return JSON.parse(json);
}

const stringifyFile = (objeto) => {
    return JSON.stringify(objeto);
}

dataBasic = {
    logo: "logoMJS.jpeg",
    index: "/",
    allProducts: '/products',
    register:'/users/register',
    login:'/users/login',
    carrito:'/carrito',
}

module.exports = {
    readFile,
    writeFile,
    parseFile,
    stringifyFile,
    dataBasic
}
