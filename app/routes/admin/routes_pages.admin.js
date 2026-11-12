const express = require('express');
const router = express.Router();
const path = require('path');
const autenticarAdmin = require('../../auth/middlewares/autenticarAdmin');

router.get('/admin/login', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'views/admin/AdminLogin.html'));
});

router.get('/admin/dashboard', autenticarAdmin, async(req, res) => {
    const DaoAgendamentos = require('../../render/agendamentos/db/DaoAgendamentos');
    const daoAgendamentos = new DaoAgendamentos();

    const agendamentosPendentes = await daoAgendamentos.buscarAgendamentosPendentes();

    res.render(path.join("admin/Solicitacoes"), {
        layout: false,
        agendamentosPendentes: agendamentosPendentes
    });
});

router.get('/admin/cadastros-pendentes', autenticarAdmin, async(req, res) => {
    const daoCadastros = require('../../render/cadastros-pendentes/db/daoCadastros');
    const cadastros = await daoCadastros();

    res.render(path.join("admin/AdminCadastrosPendentes"), {
        layout: false,
        usuarios: cadastros
    });
});

router.get('/admin/usuarios', autenticarAdmin, async(req, res) => {
    const daoUsuarios = require('../../render/usuarios/db/daoUsuarios');
    const usuarios = await daoUsuarios();

    res.render(path.join("admin/Admin-usuarios"), {
        layout: false,
        usuarios: usuarios
    });
});

module.exports = router;