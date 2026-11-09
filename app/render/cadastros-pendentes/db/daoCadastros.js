const CadastroSchema = require('../../../auth/cadastro/model/CadastroSchema');

async function daoCadastros() {
    try{
        const resposta = await CadastroSchema.find().lean();

        return resposta;
    }catch(erro){
        console.log(erro);
    }
}

module.exports=daoCadastros;