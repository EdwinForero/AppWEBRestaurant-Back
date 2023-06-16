const { model, Schema } = require("mongoose");

const AdminSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

module.exports = model("Admin", AdminSchema);