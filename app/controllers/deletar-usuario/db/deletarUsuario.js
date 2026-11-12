const UsuarioDeletar = require('../../../auth/login/model/UsuarioLoginSchema');

async function deletarUsuario(idUsuario) {
    try{
        await UsuarioDeletar.findOneAndDelete({idUsuario: idUsuario});

        return true;
    }catch(erro){
        console.log(erro);
        return;
    }
}

module.exports = deletarUsuario;