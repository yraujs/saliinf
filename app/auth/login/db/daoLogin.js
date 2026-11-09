const Login = require('../model/UsuarioLoginSchema');

async function daoLogin(usuario) {
    try{
        const login = await Login.findOne({email: usuario.email});

        if(login){
            return login;
        }
    }catch(erro){
        console.log(erro);
        return;
    }

}

module.exports = daoLogin;