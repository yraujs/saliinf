const emailValido = require('../../../utils/email/emailValido');
const daoLogin = require('../db/daoLogin');
const bcrypt = require('bcrypt');

async function controllerLogin(usuario) {
    let erros = 0;
    for(let atributo in usuario){
        if(!usuario[atributo]){
            erros++;
        }
    }

    if(!emailValido(usuario.email)){
        erros++;
    }

    if(erros > 0){
        return {
            message: "Usuário ou senha incorretos!",
            status: 400
        }
    }

    const resposta = await daoLogin(usuario);

    if(resposta?.email === usuario.email && await bcrypt.compare(usuario.senha, resposta?.senha)){
        return {
            message: "Tudo certo!",
            status: 201,
            success: true
        }        
    }else{
        console.log('deu errado');

        return {
            success: false,
            message: "Email ou senha incorretos!"
        }
    }

}

module.exports = controllerLogin;