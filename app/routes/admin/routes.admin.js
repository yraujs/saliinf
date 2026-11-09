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

module.exports = router;