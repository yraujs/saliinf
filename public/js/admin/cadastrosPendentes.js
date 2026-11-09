const {usuarios} = window.dadosPagina;

console.log(usuarios);

for(let i = 0; i < usuarios.length; i++){
    document.querySelector('#bloco-contas').insertAdjacentHTML('beforeend', `
        <tr id="bloco-usuario-${usuarios[i].idUsuario}">
            <td>
                <div class="nome-usuario">
                    <span class="avatar"><i class="fa-regular fa-user"></i></span>
                    ${usuarios[i].nomeCompleto}
                </div>
            </td>
            <td>${usuarios[i].email}</td>
            <td>${usuarios[i].dataSolicitacao.data} às ${usuarios[i].dataSolicitacao.horario}</td>
            <td>
                <div class="acoes">
                    <button id="aceitar${usuarios[i].idUsuario}" class="btn-aprovar btn-metodo">
                        <i class="fa-solid fa-check"></i>
                        Aprovar
                    </button>
                    <button id="recusar${usuarios[i].idUsuario}" class="btn-recusar btn-metodo">
                        <i class="fa-solid fa-xmark"></i>
                        Recusar
                    </button>
                </div>
            </td>
        </tr>
    `);
}   

const botoes = document.querySelectorAll('.btn-metodo');
botoes.forEach(botao => {
    const idBotao = botao.id;
    const tipoBotao = idBotao.slice(0, 7);
    const idUsuario = idBotao.slice(7, idBotao.length);

    document.getElementById(idBotao).addEventListener('click', async() => {
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