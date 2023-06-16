const Admin = require('../models/admin');

const getAdmins = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (admin) {
            res.json(admin);
        } else {
            res.json({ mensaje: "Acceso denegado" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el administrador" });
    }
};

module.exports = getAdmins;
