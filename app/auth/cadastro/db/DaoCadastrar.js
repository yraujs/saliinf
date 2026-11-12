const Cadastro = require('../model/CadastroSchema');
const UsuarioCadastro = require('../model/UsuarioCadastro');
const Usuario = require('../model/UsuarioSchema');

class DaoCadastrar{
    async daoCadastrar(usuario) {
        try{

            const cadastro = await Cadastro.create(usuario);

            return true;

        }catch(erro){

            console.log(erro);
            
            return;
        }
    }

    async emailExiste(email){
        try{
            console.log('lalala');

            const usuarioExiste = await Usuario.findOne({email: email}).lean();

            console.log(usuarioExiste);

            if(usuarioExiste?.email == null){
                console.log('usuario com esse email não existe!');
                return false;
            }else{
                console.log('usuario com esse email existe!');
                return true;
            }

        }catch(erro){
            console.log(erro);
        }
    }

    async daoCriarUsuario(idUsuario){
       try{
        console.log(idUsuario);

        const criarUsuario = await Cadastro.findOneAndUpdate(
            {idUsuario: idUsuario},
            {status: "cadastrado"},
            {new: true}
        )

        if(criarUsuario){
            return true;
        }
       }catch(erro){
        console.log(erro);
       }
    }

    async daoDeletarCadastro(idUsuario){

        try{
            const deletarCadastro = await Cadastro.findOneAndDelete({
                idUsuario: idUsuario
            });

            if(deletarCadastro){
                return true;
            }
        }catch(erro){
            console.log(erro);
        }

    }
}


module.exports = DaoCadastrar;