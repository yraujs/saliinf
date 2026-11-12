const {usuarios} = window.dadosPagina;

console.log(usuarios);

for(let i = 0; i < usuarios.length; i++){
    document.getElementById('tabela-usuarios').insertAdjacentHTML('beforeend', `
        <tr id="linha-${usuarios[i].idUsuario}">
            <td>
                <div class="nome-usuario">
                    <span class="avatar"><i class="fa-regular fa-user"></i></span>
                    ${usuarios[i].nomeCompleto}
                </div>
            </td>
            <td>${usuarios[i].email}</td>
            <td><span class="departamento">${usuarios[i].departamento}</span></td>
            <td><span class="status ativa">Ativa</span></td>
            <td>
                <div class="acoes">
                    <button class="btn-excluir" id="${usuarios[i].idUsuario}">
                        <i class="fa-regular fa-trash-can"></i>
                        Excluir usuário
                    </button>
                    <button class="btn-bloquear">
                        <i class="fa-solid fa-lock"></i>
                        Bloquear conta
                    </button>
                </div>
            </td>
        </tr>

    `);
}

const botoesExcluir = document.querySelectorAll('.btn-excluir');
botoesExcluir.forEach(botao => {
    document.getElementById(botao.id).addEventListener('click', async() => {
        console.log('excluindo...');

        const resposta = await fetch('/admin/api/excluirUsuario', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: botao.id
            })
        });

        const dados = await resposta.json();

        if(dados.success){
            console.log(dados);
            document.getElementById(`linha-${botao.id}`).remove();
        }else{
            console.log(dados);
        }
    });
});