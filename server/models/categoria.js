const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre de la categoria']

    },
    usuario: {
        type: String,
        //Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el usuario']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Categoria', categoriaSchema);