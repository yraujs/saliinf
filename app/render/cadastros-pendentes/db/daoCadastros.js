const CadastroSchema = require('../../../auth/cadastro/model/CadastroSchema');

async function daoCadastros() {
    try{
        const resposta = await CadastroSchema.find({status: "pendente"}).lean();

        return resposta;
    }catch(erro){
        console.log(erro);
    }
}

module.exports=daoCadastros;