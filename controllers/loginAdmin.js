const Admin = require("../models/admin");

const loginAdmin = async (req, res) => {
  const { correo, contraseña } = req.body;

  Admin.findOne({ correo }).then((user) => {
    if (!user) {
      return res.json({ mensaje: "Usuario no encontrado" });
    }

    if (user.contraseña === contraseña) {
      const { id, nombre } = user;
      const data = {
        id,
        nombre,
      };
      res.json({
        mensaje: "Usuario logeado correctamente",
        user: {
          id,
          nombre,
        },
      });
    } else {
      return res.json({ mensaje: "Contraseña incorrecta" });
    }
  });
};

module.exports = loginAdmin;
