const Agendamento = require('../../../controllers/solicitar-agendamento/model/AgendamentoSchema');

class DaoAgendamentos {
    async buscarAgendamentosPendentes(){
        const agendamentosPendentes = await Agendamento.find({
            status: "pendente"
        }).lean();

        return agendamentosPendentes;
    }
}

module.exports = DaoAgendamentos;