function validarEmail(email) {
  // Regex simples e funcional para a maioria dos casos
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

document.getElementById('login').addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuario = {
        email: email,
        senha: senha
    }

    let camposVazios = 0;

    for(let atributo in usuario){
        if(!usuario[atributo]){
            camposVazios++
        }

        if(camposVazios > 0 || !validarEmail(email)){
            console.log('Usuário ou senha incorretos!');
            return;
        }
    }

    const resposta = await fetch('/admin/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario
        })
    });
    const dados = await resposta.json();

    if(dados.success){
        console.log('deu certo');
        localStorage.setItem("token", dados.token);
        window.location.href='/admin/dashboard';
    }else{
        console.log(dados);
    }
});