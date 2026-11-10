function horarioInicialMaiorQueOFinal(horarioInicial, horarioFinal){
    const horasInicio = horarioInicial.slice(0, 2);
    const horasTermino = horarioFinal.slice(0, 2);

    console.log('horario inicial:', horasInicio);
    console.log('horario final:', horasTermino);

    if(parseInt(horasTermino) <= parseInt(horasInicio)){
        console.log('erro ao inserir os horários!');
        return true;
    }

    return false;
}

const botaoEnviarSolicitacao = document.getElementById('enviar-solicitacao');
botaoEnviarSolicitacao.addEventListener('click', async(e) => {
    e.preventDefault();

    const diaAgendamento = document.getElementById('dia').value;
    const horarioInicio = document.getElementById('horario-inicio').value;
    const horarioTermino = document.getElementById('horario-fim').value;
    const laboratorio = document.getElementById('laboratorio').value;
    const atividade = document.getElementById('atividade').value;

    const solicitacao = {
        diaAgendamento: diaAgendamento,
        horarioInicio: horarioInicio,
        horarioTermino: horarioTermino,
        laboratorio: laboratorio,
        atividade: atividade        
    }

    let camposVazios = 0;

    for(atributo in solicitacao){
        if(!solicitacao[atributo]){
            camposVazios++;
        }

        if(camposVazios > 0){
            console.log('os campos não foram preenchidos corretamente!');
            return;
        }
    }

    const dataEscolhida = new Date(diaAgendamento + "T00:00:00");
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if(dataEscolhida < dataAtual){
        console.log('a data escolhida é menor que a data atual!');
        return;
    }

    if(horarioInicialMaiorQueOFinal(horarioInicio, horarioTermino)){
        return;
    }

    console.log('dia do agendamento:', diaAgendamento);
    console.log('horário de início:', horarioInicio);
    console.log('horario de término:', horarioTermino);
    console.log('laboratório:', laboratorio);
    console.log('atividade:', atividade);

    const resposta = await fetch('/api/solicitarAgendamento', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            diaAgendamento: diaAgendamento,
            horarioInicio: horarioInicio,
            horarioTermino: horarioTermino, 
            laboratorio: laboratorio,
            atividade: atividade            
        })
    });
    
    const dados = await resposta.json();

    if(dados.success){
        console.log(dados);
        console.log('solicitação enviado com sucesso');
    }

});