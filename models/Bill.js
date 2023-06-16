const {model, Schema } = require('mongoose');

const BillSchema = new Schema({
    
    user: { type: String, required: true, unique: false},
    username: { type: String, required: true, unique: false},
    price: {type: String, required: true, unique: false},
    mail: { type: String, required: true, unique: false},
    state: { type: String, enum: ['En cocina','Por pagar', 'Pagado'], default: 'En cocina', unique: false},
    cocinero: {type: String, required: false, unique: false, default: 'Sin asignar'},
    cajero: {type: String, required: false, unique: false, default: 'Sin asignar'},
    descripcion: {type: String, required: false, unique: false, default: ''},
    date: {type: Date, default: Date.now()},
    
});


module.exports = model('Bill', BillSchema);