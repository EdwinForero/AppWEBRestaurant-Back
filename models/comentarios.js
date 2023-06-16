const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
  correo: { type: String, required: true},
  comentario: { type: String, required: true },
  date: {type: Date, default: Date.now()}
});

module.exports = model("Review", ReviewSchema);