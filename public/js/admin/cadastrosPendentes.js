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

const botoes = document.querySelectorAll('button');
botoes.forEach(botao => {
    const idBotao = botao.id;
    const tipoBotao = idBotao.slice(0, 7);
    const idUsuario = idBotao.slice(7, idBotao.length);

    document.getElementById(botao.id).addEventListener('click', async() => {
        const resposta = await fetch('/admin/api/analisarCadastro', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                metodo: tipoBotao,
                idUsuario: idUsuario
            })
        });
        const dados = await resposta.json();

        console.log(dados);

        if(dados.success){
            document.getElementById(`bloco-usuario-${idUsuario}`).remove();
        }
    });

})