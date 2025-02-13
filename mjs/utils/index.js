const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const dataBasic = {
    logo: "logoMJS.jpeg",
    index: "/",
    allProducts: '/products',
    register:'/users/register',
    login:'/users/login',
    carrito:'/carrito',
}


module.exports =  {
    toThousand,
    dataBasic
}