const Login = require('../model/UsuarioLoginSchema');

async function daoLogin(usuario) {

    console.log('usuario chegando no dao:', usuario);
    try{
        const login = await Login.findOne({
                email: usuario.email,
                admin: false
        });
        
        return login;

    }catch(erro){
        console.log(erro);
        return;
    }

}

module.exports = daoLogin;