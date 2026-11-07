const emailValido = require('../../../utils/email/emailValido');

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

    return {
        message: "Tudo certo!",
        status: 201,
        success: true
    }
}

module.exports = controllerLogin;