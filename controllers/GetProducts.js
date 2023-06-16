const Product = require("../models/Products");

const getProducts = async (req, res) => {
    const products = await Product.find();

    if (products) {
        res.json({ products });
    } else {
        res.json({ mensaje: "No hay productos" });
    }
};

module.exports = getProducts;