const Login = require('../model/UsuarioLoginSchema');

async function daoLogin(usuario) {
    try{
        const login = await Login.findOne({
                email: usuario.email,
                admin: false,
                status: "cadastrado"
        });
        
        return login;

    }catch(erro){
        console.log(erro);
        return;
    }
}

module.exports = daoLogin;