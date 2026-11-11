const Login = require('../../model/UsuarioLoginSchema');

async function daoLoginAdmin(usuario) {
    try{
        const login = await Login.findOne({
            email: usuario.email,
            admin: true
        }).lean();

        console.log('usuario tirado do login:', login);

        if(login){
            return login;
        }
    }catch(erro){
        console.log(erro);

        return;
    }
}

module.exports = daoLoginAdmin;