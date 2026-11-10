const moongose = require('mongoose');

const AgendamentoSchema = new moongose.Schema({
    idAgendamento: {
        type: String,
        required: true
    },

    diaAgendamento: {
        type: String,
        required: true
    },

    horarioInicio: {
        type: String,
        require: true
    },

    horarioTermino: {
        type: String,
        required: true,
    },

    laboratorio: {
        type: String,
        required: true,
    },

    atividade: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }
}, {
    collection: process.env.COLLECTION_FOR_SCHEDULING
});

module.exports= moongose.model("Agendamento", AgendamentoSchema);