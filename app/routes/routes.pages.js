const express = require('express');
const router = express.Router();
const path = require('path');
const autenticar = require('../auth/middlewares/autenticar');
const jwt = require('jsonwebtoken');

router.get('/', temToken, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/TelaPublicaView.html'));
});

router.get('/autenticacao', temToken, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Validacao-cadastro.html'));
});

router.get('/agenda/geral', autenticar, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/AgendaGeral.html'));
});

router.get('/agenda/laboratorio', autenticar, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/AgendaLab.html'));
});

router.get('/meus-agendamentos', autenticar, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/MeusAgendamentos.html'));
})

router.get('/agendamento', autenticar, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Solicitar-agendamento.html'));
});

router.get('/usuarios', autenticar, async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Usuario.html'));
});

router.get('/sobre', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Sobre.html'));
});

router.get('/ajuda', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Ajuda.html'));
});

function temToken(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return next();
    }

    try{

        jwt.verify(token, process.env.JWT_KEY);

        if(req?.admin?.admin){

            return res.redirect('/admin/dashboard');

        }else if(req?.usuario?.admin === false){

            return res.redirect('/agenda/geral');

        }

        next();

    }catch(erro){
        console.log(erro);

        res.clearCookie('token', {
            httpOnly: true,
            path: '/'
        });

        next();
    }
}

module.exports = router;