const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema({
    usuario_id: { type: String, required: true },
    productos: [{
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
        cantidad: { type: Number, required: true }
    }],
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carrito', CarritoSchema);
