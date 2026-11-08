const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/auth', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Validacao-cadastro.html'));
});

router.get('/dashboard', async(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views/Usuario.html'));
});

module.exports = router;