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
            const existeCadastroPendente = await Cadastro.findOne({email: email}).lean();

            console.log('merda');

            console.log(existeCadastroPendente);
            console.log(usuarioExiste);
            console.log('bosta');

            if(existeCadastroPendente?.email == null && usuarioExiste?.email == null){
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
        const usuarioResgatado = await Cadastro.findOne({idUsuario: idUsuario}).lean();
        console.log('usuario resgatado:', usuarioResgatado);

        const usuario = new UsuarioCadastro(usuarioResgatado.idUsuario, usuarioResgatado.nomeCompleto, usuarioResgatado.email, usuarioResgatado.senha, null, usuarioResgatado.departamento, usuarioResgatado.admin);
        delete usuario.confirmarSenha;

        const criarUsuario = await Usuario.create(usuario);
        await Cadastro.findOneAndDelete({idUsuario: idUsuario});

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