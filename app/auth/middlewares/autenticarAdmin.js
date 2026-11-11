const jwt = require('jsonwebtoken');
async function autenticarAdmin(req, res, next){
    const token = req.cookies?.token;

    if(!token && req.path !== '/autenticacao'){
        return res.redirect('/');
    }

    try{
        const admin = jwt.verify(token, process.env.JWT_KEY);

        req.admin = admin;

        if(!req.admin.admin){
            return res.redirect('/');
        }

        next();

    }catch(erro){
        console.log('token inválido ou expirado');
        
        res.clearCookie('token', {
            httpOnly: true,
            path: '/'
        })

        return res.redirect('/autenticacao');
    }
}

module.exports = autenticarAdmin;