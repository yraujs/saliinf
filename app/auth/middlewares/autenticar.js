const jwt = require('jsonwebtoken');

async function autenticar(req, res, next){
    const token = req.cookies?.token;

    if(!token && req.path !== '/autenticacao'){
        return res.redirect('/autenticacao');
    }

    try{
        const usuario = jwt.verify(token, process.env.JWT_KEY);

        req.usuario = usuario;

        console.log("usuario:", req.usuario);

        if(req.usuario.admin == true){
            console.log('sai fora admin!');
            return res.redirect('/admin/dashboard');
        }

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