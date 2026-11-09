const moongose = require('mongoose');

const UsuarioSchema = new moongose.Schema({
    idUsuario: {
        type: String,
        required: true
    },

    nomeCompleto: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        require: true
    },

    senha: {
        type: String,
        required: true,
    },

    departamento: {
        type: String,
        require: true
    },

    admin: {
        type: Boolean,
        require: true
    },

}, {
    collection: process.env.COLLECTION_FOR_USERS
});

module.exports= moongose.model("Usuario", UsuarioSchema);