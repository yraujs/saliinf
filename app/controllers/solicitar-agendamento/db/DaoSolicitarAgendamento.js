const Agendamento = require('../model/AgendamentoSchema');
const UsuarioSchema =require('../../../auth/cadastro/model/UsuarioSchema');

class DaoSolicitarAgendamento {
    async daoSolicitarAgendamento(solicitacao) {
        try{
            const resposta = await Agendamento.create(solicitacao);

            if(resposta){
                return true;
            }
        }catch(erro){
            console.log(erro);
        }
    }

    async daoBuscarUsuario(idUsuario) {
        try{
            const resposta = await UsuarioSchema.findOne({idUsuario: idUsuario}).lean();

            console.log('buscando usuário:', resposta);

            if(resposta){
                return resposta;
            }
        }catch(erro){
            console.log(erro);
        }
    }
}

module.exports = DaoSolicitarAgendamento;