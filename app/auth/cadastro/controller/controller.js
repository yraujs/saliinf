const emailValido = require('../../../utils/email/emailValido');

async function controllerCadastro(usuario) {
    
    //Verificando se algum campo está vazio
    let camposVazios = 0;
    for(let atributo in usuario){
        if(!usuario[atributo]){
            camposVazios++
        }
    }

    if(camposVazios > 0){
        return {
            message: "Os campos não foram preenchidos corretamente",
            status: 400
        }
    }

    if(!emailValido(usuario.email)){
        return {
            message: "Formato de email inválido",
            status: 400
        }
    }

    if(usuario.senha !== usuario.confirmarSenha){
        return {
            message: "As senhas não coincidem",
            status: 400
        }
    }

    //por aqui ele vai fazer contato com o banco
    //caso ele consiga, retorna sucesso pro front
    return {
        message: "Tudo certo!",
        status: 201,
        success: true
    }

}

module.exports = controllerCadastro;