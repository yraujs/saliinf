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
    }
});

//CADASTRO
document.getElementById('btn-cadastro').addEventListener('click', async() => {
    const nomeCompletoCadastro = document.getElementById('name').value;
    const emailCadastro = document.getElementById('email').value;
    const senhaCadastro = document.getElementById('password').value;
    const confirmarSenhaCadastro = document.getElementById('confirm-password').value;

    const usuario = {
        nomeCompleto:nomeCompletoCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
        confirmarSenha: confirmarSenhaCadastro
    }

    let camposVazios = 0;

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

    const resposta = await fetch('/api/cadastro', {
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

    //se der tudo certo, pode ir pra outra pagina junto com o token
    if(dados.success){
        console.log('cadastro realizado com sucesso!');
    }else{
        console.log(`erro ${dados.status} -->`, dados.message);
    }

});