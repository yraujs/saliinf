const Usuarios = require('../../../auth/cadastro/model/UsuarioSchema');

async function daoUsuarios() {
    try{
        const usuarios = await Usuarios.find({admin: false}).lean();

        console.log('usuarios:', usuarios);

        return usuarios;
    }catch(erro){
        console.log(erro);
    }
}

module.exports = daoUsuarios;