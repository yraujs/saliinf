const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/admin/dashboard', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views/admin/Solicitacoes.html'));
});

router.get('/admin/cadastros-pendentes', async(req, res) => {
    const daoCadastros = require('../../render/cadastros-pendentes/db/daoCadastros');
    const cadastros = await daoCadastros();

    res.render(path.join("admin/AdminCadastrosPendentes"), {
        layout: false,
        usuarios: cadastros
    });
});

router.get('/admin/usuarios', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views/admin/Admin-usuarios.html'));
});

module.exports = router;