const emailValido = require('../../../../utils/email/emailValido');
const daoLoginAdmin = require('../db/daoLoginAdmin');
const bcrypt = require('bcrypt');
const gerarToken = require('../../service/gerarToken');

async function controllerLoginAdmin(usuario, res) {
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

    try{
        const resposta = await daoLoginAdmin(usuario);
        
        if(resposta?.email === usuario.email && await bcrypt.compare(usuario.senha, resposta?.senha)){
            //Gerando o JWT (ou token de autenticação)
            const token = gerarToken(resposta);

            //Guardando o token no servidor para casos de renderizações e aplicações de middleware
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax"
            });

            //Retornando tais dados para o cliente:
            return {
                status: 201,
                success: true,
                token: token
            }
        }else{
            console.log('deu errado');

            return {
                success: false,
                message: "Email ou senha incorretos!"
            }
        }
    }catch(erro){
        console.log(erro);
    }
}

module.exports = controllerLoginAdmin;