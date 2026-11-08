const emailValido = require('../../../utils/email/emailValido');
const daoCadastrar = require('../db/daoCadastrar');
const bcrypt = require('bcrypt');

class ControllerCadastro{
    async controllerVerificarCadastro(usuario) {
    
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

        return {
            message: "Tudo certo!",
            status: 201,
            success: true
    }

    }

    async controllerCriarCadastro(usuario){

        try{
            usuario.password = await bcrypt.hash(usuario.senha, 10);
            console.log('usuario -->', usuario);

            const resposta = await daoCadastrar(usuario);

            return {
                message: "cadastro realizado com sucesso",
                success: resposta,
                status: 201
            }

        }catch(erro){
            console.log(erro);
        }
    }
}

module.exports = ControllerCadastro;