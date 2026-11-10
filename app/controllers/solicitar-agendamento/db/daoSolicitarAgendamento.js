const Agendamento = require('../model/AgendamentoSchema');

async function daoSolicitarAgendamento(solicitacao) {
    try{
        const resposta = await Agendamento.create(solicitacao);

        if(resposta){
            return true;
        }
    }catch(erro){
        console.log(erro);
    }
}

module.exports = daoSolicitarAgendamento;