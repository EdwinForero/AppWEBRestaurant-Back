const { model, Schema } = require("mongoose");

const CocineroSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

module.exports = model("Cocinero", CocineroSchema);