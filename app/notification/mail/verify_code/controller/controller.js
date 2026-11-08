const gerarCodigo = require('../../../services/gerarCodigo');
const enviarEmail = require('../service/enviarEmail');
const daoCodigoVerificacao = require('../db/daoCodigoVerificacao');

async function controllerEnviarCodigoVerificacao(usuario) {
    const codigoParaEnviar = gerarCodigo();

    try{
        const resposta = await enviarEmail(usuario.email, codigoParaEnviar); 

        const schema = {
            verifyCode: codigoParaEnviar,
            email: usuario.email
        }

        await daoCodigoVerificacao(schema);

        return {
            success: resposta
        }
    }catch(erro){
        console.log(erro);
    }
}

module.exports = controllerEnviarCodigoVerificacao;