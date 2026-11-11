const moongose = require('mongoose');

const LoginSchema = new moongose.Schema({

    idUsuario: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    senha: {
        type: String,
        required: true,
    },

    admin: {
        type: Boolean,
        require: true
    }

}, {
    collection: process.env.COLLECTION_FOR_USERS
});

module.exports= moongose.model("Login", LoginSchema);