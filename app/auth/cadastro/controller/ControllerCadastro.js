const emailValido = require('../../../utils/email/emailValido');
const DaoCadastrar = require('../db/DaoCadastrar');
const bcrypt = require('bcrypt');
const daoCadastrar = new DaoCadastrar();

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

        console.log('vendo se email já existe!');
        if(await daoCadastrar.emailExiste(usuario.email)){
            return {
                success: false,
                message: "Email já existente! tente outro",
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
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
            console.log('usuario -->', usuario);

            const resposta = await daoCadastrar.daoCadastrar(usuario);

            if(resposta){
                return {
                    message: "cadastro realizado com sucesso",
                    success: resposta,
                    status: 201
                }
            }

        }catch(erro){
            console.log(erro);
        }
    }

    async controllerCriarUsuario(metodo, idUsuario){
        if(!metodo || !idUsuario){
            return;
        }   

        if(idUsuario.length != 22){
            console.log('menor ou maior que 22!');
            return;
        }

        if(metodo === "aceitar"){
            const resposta = await daoCadastrar.daoCriarUsuario(idUsuario);
            return {
                success: resposta,
                status: 201
            }
        }else if(metodo === "recusar"){
            const resposta = await daoCadastrar.daoDeletarCadastro(idUsuario);
            return {
                success: resposta,
                status: 201
            }
        }else{
            return;
        }
    }
}

module.exports = ControllerCadastro;