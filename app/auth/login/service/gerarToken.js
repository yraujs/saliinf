const jwt = require('jsonwebtoken');

function gerarToken(usuario){
    const token = jwt.sign(
    {
        id: usuario.idUsuario,
        admin: usuario.admin
    },
    process.env.JWT_KEY,
    {
        expiresIn: "1h"
    }
);
    return token;
}

module.exports=gerarToken;