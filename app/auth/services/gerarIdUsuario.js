const crypto = require('crypto');

function gerarIdUsuario(){
    const randomHash = crypto.randomBytes(11).toString('hex');

    return randomHash;
}

module.exports=gerarIdUsuario;
