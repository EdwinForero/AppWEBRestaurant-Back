const Cart = require('../models/Cart');


const deleteCartUser = async (req, res) => {

    const { userId } = req.params;

    await Cart.deleteMany({ user: userId }).then(() => {
        res.json({ mensaje: "Eliminados" });
    })

}

module.exports = deleteCartUser;