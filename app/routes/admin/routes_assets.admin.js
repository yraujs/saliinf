const express = require('express');
const router = express.Router();
const path = require('path');

//Arquivos Admin
router.get('/js-admin/:file', (req, res) => {
    const {file} = req.params;
    res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'js', 'admin', file));
});

module.exports = router;