const jwt = require('jsonwebtoken');

async function autenticar(req, res, next){
    const token = req.cookies?.token;

    if(!token && req.path !== '/autenticacao'){
        return res.redirect('/autenticacao');
    }

    try{
        const usuario = jwt.verify(token, process.env.JWT_KEY);

        req.usuario = usuario;

        console.log(req.usuario);

        console.log('tem token');

        next();

    }catch(erro){
        console.log('token inválido ou expirado');

        //await logout(req.usuario.id);
        
        res.clearCookie('token', {
            httpOnly: true,
            path: '/'
        })

        return res.redirect('/autenticacao');
    }
}

module.exports=autenticar;