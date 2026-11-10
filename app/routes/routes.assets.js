const { File } = require('buffer');
const express = require('express');
const router = express.Router();
const path = require('path');

//------------------------------------CSS----------------------------------------------//
router.get('/css/:file', (req, res) => {
    const file = req.params.file;
    res.sendFile(path.join(__dirname, '..', '..', "public", 'assets', 'css', file));
});


//------------------------------------IMAGES-------------------------------------------//
router.get('/img/:file', (req, res) => {
    const file = req.params.file;
    res.sendFile(path.join(__dirname, '..', '..', "public", 'img', file));
});


//Arquivos Comuns 
router.get('/js/:file', (req, res) => {
    const {file} = req.params;
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'js', file));
});


//Utils
router.get('/js.utils/:file', (req, res) => {
    const {file} = req.params;
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'js', 'utils', file));
});

module.exports = router;

