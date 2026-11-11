const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/admin/api/analisarCadastro', async(req, res) => {
    const {metodo, idUsuario} = req.body;

    const ControllerCadastro = require('../../auth/cadastro/controller/ControllerCadastro');
    const controllerCadastro = new ControllerCadastro();
    const resposta = await controllerCadastro.controllerCriarUsuario(metodo, idUsuario);

    res.json(resposta);
});

router.post('/admin/api/login', async(req, res) => {
    const { usuario } = req.body;

    const controllerLoginAdmin = require('../../auth/login/admin/controller/controller');
    const resposta = await controllerLoginAdmin(usuario, res);

    res.json(resposta);
});

module.exports = router;