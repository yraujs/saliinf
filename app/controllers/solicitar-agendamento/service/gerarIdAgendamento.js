const crypto = require('crypto');

function gerarIdAgendamento(){
    const randomHash = crypto.randomBytes(6).toString('hex');
    
    return randomHash;
}

module.exports=gerarIdAgendamento;
