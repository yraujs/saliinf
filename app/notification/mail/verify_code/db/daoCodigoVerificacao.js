const VerifyCode = require('../model/VerifyCodeSchema');

async function daoCodigoVerificacao(schema){
    try{
    
        console.log('código:', schema.verifyCode);
        
        const criarUsuario = await VerifyCode.create(schema);
        
        return true;
        
    }catch(erro){
        console.log(erro);

        return;
    }
}

module.exports = daoCodigoVerificacao;