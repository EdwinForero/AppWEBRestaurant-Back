const Cart = require("../models/Cart");

const getUserCart = async (req, res) => {

    const { userId } = req.params;
    
    const userCart = await Cart.find({user: userId});

    if (userCart) {
        res.json({ userCart });
    }else {
        res.json({ mensaje: "No hay productos" });
    }
};

module.exports = getUserCart;