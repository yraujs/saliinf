const Cadastro = require('../model/CadastroSchema');

async function daoCadastrar(usuario) {
    try{

        const cadastro = await Cadastro.create(usuario);

        return true;

    }catch(erro){

        console.log(erro);
        
        return;
    }
}

module.exports = daoCadastrar;