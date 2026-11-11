const express = require('express');
const router = express.Router();
const autenticar = require('../auth/middlewares/autenticar');

router.use(express.json());

router.post('/api/verificarDadosCadastro', async(req, res) => {
    console.log('chegando na api para verificar os dados de cadastro...');

    //Criando um objeto com os dados recebidos
    const { nomeCompleto, email, senha, confirmarSenha } = req.body;
    const UsuarioCadastro = require('../auth/cadastro/model/UsuarioCadastro');
    const usuario = new UsuarioCadastro('123', nomeCompleto, email, senha, confirmarSenha, 'now', "DAIC", true);

    const ControllerCadastro = require('../auth/cadastro/controller/ControllerCadastro');
    const controllerCadastro = new ControllerCadastro();
    const resposta = await controllerCadastro.controllerVerificarCadastro(usuario);

    //Retornando resposta ao front
    res.json(resposta);
});

router.post('/api/enviarCodigoDeVerificacao', async(req, res) => {
    console.log('enviando código de verificação...');

    const {nomeCompleto, email} = req.body;
    const UsuarioCadastro = require('../auth/cadastro/model/UsuarioCadastro');
    const usuario = new UsuarioCadastro(null, nomeCompleto, email);

    const controllerEnviarCodigoVerificacao = require('../notification/mail/verify_code/controller/controller');
    const resposta = await controllerEnviarCodigoVerificacao(usuario);

    res.json(resposta);
});

router.post('/api/verificarCodigo', async(req, res) => {
    console.log('verificando código');

    const { codigo, email } = req.body;

    const controllerVerificarCodigo = require('../auth/verificar-codigo/controller/controller');
    const resposta = await controllerVerificarCodigo(codigo, email);

    res.json(resposta);
});

router.post('/api/cadastrarUsuario', async(req, res) => {
    console.log('cadastrando usuário...');

    const { nomeCompleto, email, senha, dataSolicitacao } = req.body;
    const UsuarioCadastro = require('../auth/cadastro/model/UsuarioCadastro');
    const gerarIdUsuario = require('../auth/services/gerarIdUsuario');

    const usuario = new UsuarioCadastro(gerarIdUsuario(), nomeCompleto, email, senha, null, dataSolicitacao, "DAIC", false);
    delete usuario.confirmarSenha;

    const ControllerCadastro = require('../auth/cadastro/controller/ControllerCadastro');
    const controllerCadastro = new ControllerCadastro();
    const resposta = await controllerCadastro.controllerCriarCadastro(usuario);

    //Retornando resposta ao front
    res.json(resposta);

});

router.post('/api/login', async(req, res) => {
    console.log('chegando na api de login');

    const {email, senha} = req.body;
    const UsuarioLogin = require('../auth/login/model/UsuarioLogin');
    const usuario = new UsuarioLogin('123', email, senha, true);

    const controllerLogin = require('../auth/login/controller/controller');
    const resposta = await controllerLogin(usuario, res);

    res.json(resposta);
});

router.post('/api/solicitarAgendamento', autenticar, async(req, res) => {
    console.log('solicitando agendamento...');

    const { diaAgendamento, horarioInicio, horarioTermino, laboratorio, atividade} = req.body;

    const gerarIdAgendamento = require('../controllers/solicitar-agendamento/service/gerarIdAgendamento');
    const Agendamento = require('../controllers/solicitar-agendamento/model/Agendamento');
    const agendamento = new Agendamento(gerarIdAgendamento(), req.usuario.id, "nomeCompleto", "...", diaAgendamento, horarioInicio, horarioTermino, laboratorio, atividade, "pendente");

    const controllerSolicitarAgendamento = require('../controllers/solicitar-agendamento/controller/controllerSolicitarAgendamento');
    const resposta = await controllerSolicitarAgendamento(agendamento);

    res.json(resposta);
});

router.post('/logout', autenticar, async(req, res) => {
    console.log('chegando no logout');

    res.clearCookie("token");
    console.log('saindo do logout');

    return res.redirect('/');
});

module.exports = router;