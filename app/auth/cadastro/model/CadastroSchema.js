const moongose = require('mongoose');

const CadastroSchema = new moongose.Schema({
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
        require: true
    },

    senha: {
        type: String,
        required: true,
    },

    dataSolicitacao: {
        data: {
            type: String,
            required: true
        },
        horario: {
            type: String,
            required: true,
        }
    },

    departamento: {
        type: String,
        require: true
    },

    status: {
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

module.exports= moongose.model("Cadastro", CadastroSchema);