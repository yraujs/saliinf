const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/TelaPublicaView.html'));
});

router.get('/autenticacao', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Validacao-cadastro.html'));
});

router.get('/geral', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/AgendaGeral.html'));
});

router.get('/agendamento', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Agendamento.html'));
});

router.get('/sobre', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Sobre.html'));
});

router.get('/ajuda', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Ajuda.html'));
});

module.exports = router;