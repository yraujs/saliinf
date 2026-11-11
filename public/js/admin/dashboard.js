import logout from "/js.utils/logout.js";

document.getElementById('sair').addEventListener('click', () => {
    console.log('saindo...');
    logout();
});

const {agendamentosPendentes} = window.dadosPagina;

console.log(agendamentosPendentes);

for(let i = 0; i < agendamentosPendentes.length; i++){
    if(agendamentosPendentes[i].departamento === "DAIC"){
        document.querySelector('.lista-solicitacoes').insertAdjacentHTML('beforeend', `
            <div class="cartao-solicitacao">
                    <div class="usuario">
                        <div class="avatar"></div>
                        <strong>${agendamentosPendentes[i].nomeCompleto}</strong>
                    </div>

                    <div class="informacoes">
                        <div class="info-linha">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                                <rect x="3" y="5" width="18" height="16" rx="2"/>
                                <path d="M7 2v6M17 2v6M3 10h18"/>
                            </svg>
                            <span>${agendamentosPendentes[i].diaAgendamento}</span>
                        </div>
                        <div class="info-linha">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                                <circle cx="12" cy="12" r="9"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                            <span>${agendamentosPendentes[i].horarioInicio} - ${agendamentosPendentes[i].horarioTermino}</span>
                        </div>
                    </div>

                    <div class="acoes">
                        <button class="btn-aprovar" type="button">
                            <span class="icone-check">✓</span>
                            Aprovar
                        </button>
                        <button class="btn-recusar" type="button">Recusar</button>
                    </div>

                    <button class="btn-detalhes" type="button">
                        Ver Detalhes <span>&gt;&gt;</span>
                    </button>
                </div>
            `);
    }
}