const VerifyCode = require('../../../notification/mail/verify_code/model/VerifyCodeSchema');

async function daoVerificarCodigo(codigo, email){

    const verifyCode = await VerifyCode.findOne({
        verifyCode: codigo,
        email: email
    });

    console.log('resetCode no dao -->', verifyCode);

    return verifyCode;
}

module.exports=daoVerificarCodigo;