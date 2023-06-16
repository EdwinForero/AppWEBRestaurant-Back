const Cart = require("../models/Cart");

const getProductsCart = async (req, res) => {
  
    
    const productsCart = await Cart.find();

    if (productsCart) {
        res.json({ productsCart });
    } else {
        res.json({ mensaje: "No hay productos" });
    }
};

module.exports = getProductsCart;