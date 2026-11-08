const moongose = require('mongoose');

const VerifyCodeSchema = new moongose.Schema({

    verifyCode: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true
    },

    createIn: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 300
    }

}, {
    collection: process.env.COLLECTION_FOR_VERIFY_CODE
});

module.exports= moongose.model("VerifyCode", VerifyCodeSchema);