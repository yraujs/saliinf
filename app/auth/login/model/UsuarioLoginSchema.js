const moongose = require('mongoose');

const LoginSchema = new moongose.Schema({

    email: {
        type: String,
        require: true
    },

    senha: {
        type: String,
        required: true,
    },

}, {
    collection: process.env.COLLECTION_FOR_USERS
});

module.exports= moongose.model("Login", LoginSchema);