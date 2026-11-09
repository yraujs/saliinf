const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/admin/dashboard', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views/Solicitacoes.html'));
});

router.get('/cadastros-pendentes', async(req, res) => {
    const daoCadastros = require('../../render/cadastros-pendentes/db/daoCadastros');
    const cadastros = await daoCadastros();

    res.render(path.join("admin/CadastrosPendentes"), {
        layout: false,
        usuarios: cadastros
    })
})

module.exports = router;