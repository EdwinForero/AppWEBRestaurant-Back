const Product = require("../models/Products");
const Cart = require("../models/Cart");


const emptyCart = async () => {

    await Product.updateMany({inCart: true}, {inCart: false});
}



module.exports = emptyCart;