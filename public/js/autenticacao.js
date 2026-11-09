const container = document.getElementById('container');
const toRegisterBtn = document.getElementById('to-register');
const toLoginBtn = document.getElementById('to-login');

toRegisterBtn.addEventListener('click', () => {
    container.classList.add('active');
});

toLoginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

function validarEmail(email) {
  // Regex simples e funcional para a maioria dos casos
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

document.getElementById('btn-login').addEventListener('click', async() => {
    const emailLogin = document.getElementById('email-login').value;
    const senhaLogin = document.getElementById('password-login').value;

    const usuario = {
        email: emailLogin,
        senha: senhaLogin
    }

    let camposVazios = 0;

    for(let atributo in usuario){
        if(!usuario[atributo]){
            camposVazios++
        }

        if(camposVazios > 0 || !validarEmail(emailLogin)){
            console.log('Usuário ou senha incorretos!');
            return;
        }
    }

    const resposta = await fetch('/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailLogin,
            senha: senhaLogin
        })
    });

    const dados = await resposta.json();

    if(dados.success){
        console.log('deu certo');
    }else{
        console.log('raquel me deve 1000 reaix  ');
    }
});

async function enviarCodigo() {
    const nomeCompletoCadastro = document.getElementById('name').value;
    const emailCadastro = document.getElementById('email').value;
    
    const resposta = await fetch('/api/enviarCodigoDeVerificacao', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeCompleto:nomeCompletoCadastro,
                email: emailCadastro
            })
        });

    const dados = await resposta.json();

    if(dados.success){
        console.log('código enviado!');
    }else{
        console.log(`erro ${dados.status} -->`, dados.message);
    }
}

//CADASTRO
document.getElementById('btn-cadastro').addEventListener('click', async(e) => {
    const nomeCompletoCadastro = document.getElementById('name').value;
    const emailCadastro = document.getElementById('email').value;
    const senhaCadastro = document.getElementById('password').value;
    const confirmarSenhaCadastro = document.getElementById('confirm-password').value;

    e.preventDefault();

    const usuario = {
        nomeCompleto:nomeCompletoCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
        confirmarSenha: confirmarSenhaCadastro
    }

    let camposVazios = 0;

    console.log('nome:', nomeCompletoCadastro);
    console.log('email:', emailCadastro);
    console.log('senha:', senhaCadastro);
    console.log('confirmar senha:', confirmarSenhaCadastro);

    for(let atributo in usuario){
        if(!usuario[atributo]){
            camposVazios++
        }

        if(camposVazios > 0){
            console.log('Os campos não foram preenchidos corretamente!');
            return;
        }
    }

    if(!validarEmail(emailCadastro)){
        console.log('Formato de email inválido!');
        return;
    }

    if(senhaCadastro !== confirmarSenhaCadastro){
        console.log('As senhas não coincidem');
        return;
    }

    const btnEnviar = document.getElementById("btn-cadastro");
    const loading = document.getElementById('loading');

    btnEnviar.classList.add('loading');
    loading.classList.remove('hidden');

    btnEnviar.disabled=true;

    try{

        const resposta = await fetch('/api/verificarDadosCadastro', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeCompleto:nomeCompletoCadastro,
                email: emailCadastro,
                senha: senhaCadastro,
                confirmarSenha: confirmarSenhaCadastro
            })
        });

        const dados = await resposta.json();

        if(dados.success){
            await enviarCodigo();
            window.location.href="#verificacao";
        }else{
            console.log(`erro ${dados.status} -->`, dados.message);
        }

    }catch(erro){
        console.log(erro);
    }finally{

        loading.classList.add('hidden');
        btnEnviar.classList.remove('loading');

        btnEnviar.disabled=false;
    }
 
});

function trocarInput(idAtual, idProximo){
    if(document.getElementById(idAtual).value >= 0){
        document.getElementById(idProximo).focus();
    }
}


let cod = ['cod1', 'cod2', 'cod3', 'cod4', 'cod5', 'cod6']

function getCodigo(){
    const valores = [];

    for(let i in cod){
        let valor = document.getElementById(cod[i]).value;
        
        valores.push(valor);
    }

    const codigo = valores.join("");
    return codigo;
}

async function cadastrarUsuario() {
    const nomeCompleto = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
  
    try{

        const resposta = await fetch('/api/cadastrarUsuario', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeCompleto:nomeCompleto,
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if(dados.success){
            
        }else{
            console.log(`erro ${dados.status} -->`, dados.message);
        }

    }catch(erro){

        console.log(erro);
    }

}

document.getElementById('btn-verificar_codigo').addEventListener('click', async() => {
    const codigoDeVerificacao = getCodigo();
    const email = document.getElementById('email').value;

    const resposta = await fetch('/api/verificarCodigo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codigo: codigoDeVerificacao,
            email: email
        })
    });

    const dados = await resposta.json();

    if(dados.success){
        cadastrarUsuario();

        console.log('cadastro realizado com sucesso! Sua conta será analisada e em pouco tempo verifique seu email para saber se pode acessar o sistema...');

        let contador = 0;

        const intervalo = setInterval(() => {
            contador++;
            console.log(contador);

            if(contador === 5){
                clearInterval(intervalo);
                console.log('redirecionando...');
                window.location.href="/autenticacao";
            }
        }, 1000)

    }else{
        console.log("deu pau");
    }
});

//CÓDIGO DE VERIFICAÇÃO
/*
let cod = ['cod1', 'cod2', 'cod3', 'cod4', 'cod5', 'cod6']

for(let codigo in cod){
    let inputCodigo = document.querySelector(`#${cod[codigo]}`);
    console.log(cod[codigo])
    inputCodigo.addEventListener('input', ()=>{
        inputCodigo.value = inputCodigo.value.replace(/\D/g, "")
        console.log("teste")
    });
};*/