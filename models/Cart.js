const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  user: {type: String, required: true, unique: false}
});

module.exports = model("Cart", CartSchema);
 