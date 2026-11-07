const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/api/cadastro', async(req, res) => {
    console.log('chegando na api de cadastro...');

    //Criando um objeto com os dados recebidos
    const { nomeCompleto, email, senha, confirmarSenha } = req.body;
    const UsuarioCadastro = require('../auth/cadastro/model/UsuarioCadastro');
    const usuario = new UsuarioCadastro(nomeCompleto, email, senha, confirmarSenha);

    const controllerCadastro = require('../auth/cadastro/controller/controller');
    const resposta = await controllerCadastro(usuario);

    //Retornando resposta ao front
    res.json(resposta);
});

router.post('/api/login', async(req, res) => {
    console.log('chegando na api de login');

    const {email, senha} = req.body;
    const UsuarioLogin = require('../auth/login/model/UsuarioLogin');
    const usuario = new UsuarioLogin(email, senha);

    const controllerLogin = require('../auth/login/controller/controller');
    const resposta = await controllerLogin(usuario);

    res.json(resposta);
});

module.exports = router;