const {usuarios} = window.dadosPagina;

console.log(usuarios);

for(let i = 0; i < usuarios.length; i++){
    document.querySelector('.bloco-contas').insertAdjacentHTML('beforeend', `
        <div class="bloco-usuario" id="bloco-usuario-${usuarios[i].idUsuario}">
            <div class="dados">
                <h3>Nome: ${usuarios[i].nomeCompleto}  <br> Email: ${usuarios[i].email}  <br> Departamento: ${usuarios[i].departamento}</h3>
            </div>
            <div class="botoes">
                <button id="aceitar${usuarios[i].idUsuario}">Aceitar</button>
                <button id="recusar${usuarios[i].idUsuario}">Recusar</button>
            </div>
        </div> 
    `);
}   

async function aceitarUsuario(idUsuario) {
    const resposta = await fetch('/api/aceitarCadastroUsuario', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario
        })
    });

    const dados = await resposta.json();

    if(dados.success){
        document.getElementById(`bloco-usuario-${usuarios[i].idUsuario}`).remove();
    }
}

async function recusarUsuario(idUsuario) {
    const resposta = await fetch('/api/recusarCadastroUsuario', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario
        })
    });
    
    const dados = await resposta.json();

    if(dados.success){
        document.getElementById(`bloco-usuario-${usuarios[i].idUsuario}`).remove();
    }
}

const botoes = document.querySelectorAll('button');
botoes.forEach(botao => {
    const idBotao = botao.id;
    const tipoBotao = idBotao.slice(0, 7);
    const idUsuario = idBotao.slice(7, idBotao.length);

    if(tipoBotao === "aceitar"){
        document.getElementById(idBotao).addEventListener('click', async() => {
            await aceitarUsuario(idUsuario);
        });
    }else if(tipoBotao === "recusar"){
        document.getElementById(idBotao).addEventListener('click', async() => {
            await aceitarUsuario(idUsuario);
        });
    }

})