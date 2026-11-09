const daoVerificarCodigo = require('../db/daoVerificarCodigo');

async function controllerVerificarCodigo(codigo, email){

    if(codigo < 6){
        return {
            success: false
        }
    }

    try{

        const respostaDao = await daoVerificarCodigo(codigo, email);
        const codigoRetornado = respostaDao.verifyCode;

        if(!respostaDao || codigo !== codigoRetornado){
            return {
                status: 500,
                erro: "Código Inválido"
            }
        }

        return {
            success: true,
            status: 201,
            message: "Certo! Código válido"
        }
        
    }catch(erro){
       console.log(erro); 
    }
}

module.exports=controllerVerificarCodigo;